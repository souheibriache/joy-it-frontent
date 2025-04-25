"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { type ActivityFilterDto, ActivityType } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [durationRange, setDurationRange] = useState<[number, number]>([
    filters.durationMin || 0,
    filters.durationMax || 8,
  ]);

  // If the parent initialFilters ever change (e.g. via back/forward), sync them
  useEffect(() => {
    setFilters(initialFilters);
    setDurationRange([
      initialFilters.durationMin || 0,
      initialFilters.durationMax || 8,
    ]);
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (value: ActivityType) => {
    setFilters((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      isAvailable: checked,
    }));
  };

  const handleDurationChange = (values: number[]) => {
    // Ensure values are proper numbers
    const [min, max] = values.map(Number);
    setDurationRange([min, max]);
    setFilters((prev) => ({
      ...prev,
      durationMin: min,
      durationMax: max,
    }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.type) count++;
    if (filters.isAvailable !== undefined) count++;
    if (filters.durationMin !== undefined || filters.durationMax !== undefined)
      count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-in fade-in-50 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Filtres</h2>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFilterCount()} actif
              {getActiveFilterCount() > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
            Recherche
          </Label>
          <Input
            id="search"
            name="search"
            value={filters.search || ""}
            onChange={handleInputChange}
            placeholder="Nom, lieu ou mot-clé..."
            className="w-full"
          />
        </div>

        {/* Availability */}
        <div className="space-y-2 flex items-end">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAvailable"
              checked={!!filters.isAvailable}
              onCheckedChange={handleAvailabilityChange}
            />
            <Label
              htmlFor="isAvailable"
              className="text-sm font-medium cursor-pointer"
            >
              Activités disponibles uniquement
            </Label>
          </div>
        </div>
      </div>

      {/* Types */}
      <div className="mt-6">
        <Label className="text-sm font-medium mb-3 block">
          Type d'activité
        </Label>
        <RadioGroup
          value={filters.type || ""}
          onValueChange={handleTypeChange}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2"
        >
          {Object.values(ActivityType).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem value={type} id={`type-${type}`} />
              <Label
                htmlFor={`type-${type}`}
                className="text-sm cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Duration */}
      <div className="mt-6">
        <Label className="text-sm font-medium mb-3 block">Durée (heures)</Label>
        <div className="px-2 py-6">
          <Slider
            defaultValue={durationRange}
            min={0}
            max={8}
            step={0.5}
            value={durationRange}
            onValueChange={handleDurationChange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{durationRange[0]} h</span>
            <span>{durationRange[1]} h</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => onApplyFilters(filters)}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

export default ActivityFilter;
