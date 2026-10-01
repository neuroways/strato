import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import knowledge from "../data/knowledge.json";

export default function Knowledge() {
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("alle");

  const categories = ["alle", ...new Set(knowledge.map((k) => k.category))];

  const filteredKnowledge =
    selectedCategory === "alle"
      ? knowledge
      : knowledge.filter((k) => k.category === selectedCategory);

  const difficultyColors = {
    beginner: "bg-green-900/30 text-green-400",
    intermediate: "bg-yellow-900/30 text-yellow-400",
    advanced: "bg-red-900/30 text-red-400",
  };

  const difficultyLabels = {
    beginner: "Anfänger",
    intermediate: "Mittelstufe",
    advanced: "Fortgeschritten",
  };

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Klangwissen
          </h1>
          <p className="text-lg text-gray-400">
            Technische Dokumentation und Erklärungen zu Audio, MIDI und Studioproduktion
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              {cat === "alle" ? "Alle Artikel" : cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredKnowledge.map((article) => (
            <div
              key={article.id}
              className="bg-gray-800/40 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
            >
              <button
                onClick={() =>
                  setExpandedArticle(expandedArticle === article.id ? null : article.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center gap-4 text-left flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{article.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-gray-400 text-sm">{article.category}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          difficultyColors[article.difficulty]
                        }`}
                      >
                        {difficultyLabels[article.difficulty]}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-gray-400 transition-transform flex-shrink-0 ${
                    expandedArticle === article.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expandedArticle === article.id && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                  <div className="mb-4">
                    <p className="text-gray-300 leading-relaxed">{article.content}</p>
                  </div>

                  {article.keyPoints?.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3">Wichtige Punkte:</h4>
                      <ul className="space-y-2">
                        {article.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex gap-3 text-gray-300">
                            <span className="text-orange-400 font-bold mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredKnowledge.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Keine Artikel in dieser Kategorie gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
}
