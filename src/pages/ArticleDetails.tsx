"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetArticleById } from "@/utils/api/blog-api";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Facebook, Linkedin, Twitter } from "lucide-react";

const ArticleDetails = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { article, isLoading } = useGetArticleById(articleId || "");
  const [readingTime, setReadingTime] = useState<number>(0);

  // Calculate reading time based on content length
  useEffect(() => {
    if (article) {
      const wordCount =
        (article.introduction?.split(" ").length || 0) +
        (article.conclusion?.split(" ").length || 0) +
        (article.paragraphs?.reduce(
          (acc: number, p: { content: string }) =>
            acc + p.content.split(" ").length,
          0
        ) || 0);

      // Average reading speed: 200 words per minute
      const time = Math.ceil(wordCount / 200);
      setReadingTime(time);
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-64 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Article non trouvé</h1>
        <p className="text-gray-600 mt-2">
          L'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button asChild className="mt-6">
          <Link to="/blog">Retour aux actualités</Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <>
      <div className="flex flex-col relative ">
        {/* Hero Header */}
        <div className="w-full relative">
          <div className="bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center w-full flex flex-col gap-6 px-4 py-16 md:p-20">
            <div className="container mx-auto">
              <ul className="flex flex-wrap items-center gap-2 text-white text-sm mb-8">
                <Link to="/" className="hover:underline">
                  Accueil
                </Link>
                <span className="mx-2">/</span>
                <Link to="/blog" className="hover:underline">
                  Actualités
                </Link>
              </ul>

              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bolota max-w-4xl mx-auto text-center leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-white text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readingTime} min de lecture</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Subtitle */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-4">
                {article.subtitle}
              </h2>

              {/* Author Info */}
              <Card className="bg-gray-50 border-none">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <AvatarImage
                        src={
                          article.author?.profilePicture?.fullUrl ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(
                          article.author?.firstName,
                          article.author?.lastName
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">
                        {article.author?.firstName} {article.author?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {article.author?.role || "Auteur"}
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="ml-auto flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-8 w-8"
                        aria-label="Share on Twitter"
                      >
                        <Twitter size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-8 w-8"
                        aria-label="Share on Facebook"
                      >
                        <Facebook size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-8 w-8"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Image */}
            {article.thumbnail?.fullUrl && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                <img
                  className="w-full h-auto max-h-[50vh] object-cover"
                  src={article.thumbnail.fullUrl || "/placeholder.svg"}
                  alt={article.title}
                />
              </div>
            )}

            {/* Introduction */}
            {article.introduction && (
              <div className="mb-10">
                <p className="text-lg leading-relaxed text-gray-800 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                  {article.introduction}
                </p>
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-16">
              {article.paragraphs?.map((paragraph: any, index: number) => (
                <div
                  key={index}
                  className="scroll-m-20"
                  id={`paragraph-${index}`}
                >
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                    } gap-6 lg:gap-10`}
                  >
                    {paragraph?.image?.fullUrl && (
                      <div className="lg:w-2/5">
                        <div className="rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-[1.02]">
                          <img
                            className="w-full h-auto aspect-video object-cover"
                            src={paragraph.image.fullUrl || "/placeholder.svg"}
                            alt={paragraph.title}
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className={
                        paragraph?.image?.fullUrl ? "lg:w-3/5" : "w-full"
                      }
                    >
                      <h3 className="text-xl sm:text-2xl font-bolota text-primary mb-3">
                        {paragraph.title}
                      </h3>

                      {paragraph.subtitle && (
                        <h4 className="text-lg font-medium text-gray-700 mb-4">
                          {paragraph.subtitle}
                        </h4>
                      )}

                      <p className="text-gray-800 leading-relaxed">
                        {paragraph.content}
                      </p>
                    </div>
                  </div>

                  {index < article.paragraphs.length - 1 && (
                    <Separator className="mt-16 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            {article.conclusion && (
              <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Conclusion
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {article.conclusion}
                </p>
              </div>
            )}

            {/* Tags */}
            {article.tags?.length > 0 && (
              <div className="mt-10">
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  MOTS CLÉS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio (Extended) */}
            <div className="mt-16">
              <Card className="bg-gray-50 border-none">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage
                        src={
                          article.author?.profilePicture?.fullUrl ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback className="bg-primary text-white text-xl">
                        {getInitials(
                          article.author?.firstName,
                          article.author?.lastName
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        À propos de {article.author?.firstName}{" "}
                        {article.author?.lastName}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {article.author?.bio ||
                          `${article.author?.firstName} est un expert passionné qui partage régulièrement ses connaissances sur notre blog. Avec plusieurs années d'expérience dans le domaine, ses articles sont toujours informatifs et inspirants.`}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Twitter size={16} className="mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Linkedin size={16} className="mr-2" />
                          LinkedIn
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Articles */}
      </div>

      <Footer />
    </>
  );
};

export default ArticleDetails;
