import React, { useState, useEffect } from "react";
import { ActivityFilterDto, ActivityType } from "@/types/activity";

interface ActivityFilterProps {
  initialFilters: ActivityFilterDto;
  onApplyFilters: (filters: ActivityFilterDto) => void;
  onClearFilters: () => void;
}

export const ActivityFilter: React.FC<ActivityFilterProps> = ({
  initialFilters,
  onApplyFilters,
  onClearFilters,
}) => {
  const [filters, setFilters] = useState<ActivityFilterDto>(initialFilters);

  // If the parent initialFilters ever change (e.g. via back/forward), sync them
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (type: ActivityType) => {
    setFilters((prev) => {
      const types = prev.types || [];
      const updated = types.includes(type)
        ? types.filter((t) => t !== type)
        : [...types, type];
      return { ...prev, types: updated };
    });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      isAvailable: e.target.checked,
    }));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-bold">Filtres</h2>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recherche
        </label>
        <input
          type="text"
          name="search"
          value={filters.search || ""}
          onChange={handleInputChange}
          placeholder="Rechercher par nom ou mot-clé"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      {/* Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Types d'activités
        </label>
        <div className="mt-2 space-y-2">
          {Object.values(ActivityType).map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.types?.includes(type) || false}
                onChange={() => handleCheckboxChange(type)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Durée Min (h)
          </label>
          <input
            type="number"
            name="durationMin"
            value={filters.durationMin ?? ""}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Durée Max (h)
          </label>
          <input
            type="number"
            name="durationMax"
            value={filters.durationMax ?? ""}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={!!filters.isAvailable}
            onChange={handleAvailabilityChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            Montrer uniquement les activités disponibles
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={() => onApplyFilters(filters)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Appliquer
        </button>
        <button
          onClick={onClearFilters}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};
