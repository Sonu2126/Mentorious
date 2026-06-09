"use client";
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Sparkles, BookOpen, Brain, Terminal, MessageSquare, Lightbulb, CheckCircle2, Award, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAIModal";

import QUESTIONS from './data.json';

const CATEGORIES = ["All", "Frontend", "Backend", "Full Stack", "Behavioral", "Algorithm", "C++", "Python"];

function Questions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  
  // Track inputs and evaluation results for each question
  const [userAnswers, setUserAnswers] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [evaluationResults, setEvaluationResults] = useState({});

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const evaluateAnswer = async (question) => {
    const userAnswer = userAnswers[question.id];
    if (!userAnswer || !userAnswer.trim()) return;

    setLoadingStates(prev => ({ ...prev, [question.id]: true }));

    const prompt = `Question: "${question.question}"
User's Answer: "${userAnswer}"
Correct / Reference Answer: "${question.answer}"

Evaluate the user's answer against the correct reference answer for accuracy, depth, and completeness. 
Provide your response strictly in the following JSON format:
{
  "rating": <number from 1 to 10>,
  "feedback": "<brief feedback in simple English explaining what they did well and what is missing>",
  "improvementTips": ["tip 1", "tip 2"]
}
Do not include any markdown format tags like \`\`\`json or \`\`\` around the JSON response.`;

    try {
      const result = await chatSession.sendMessage(prompt);
      let responseText = result.response.text();
      // Clean up in case Gemini wraps in markdown despite instructions
      const cleanedJson = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const parsedResult = JSON.parse(cleanedJson);

      setEvaluationResults(prev => ({
        ...prev,
        [question.id]: parsedResult
      }));
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setEvaluationResults(prev => ({
        ...prev,
        [question.id]: {
          rating: "N/A",
          feedback: "Failed to evaluate answer. Please try again.",
          improvementTips: ["Check your network connection and API key configuration."]
        }
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [question.id]: false }));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50';
      case 'hard':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Hero Header */}
      <div className="relative mb-8 text-center md:text-left">
        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <BookOpen className="h-7 w-7 text-primary" />
          <h2 className="font-extrabold text-3xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent tracking-tight">
            Questions Library
          </h2>
        </div>
        <p className="text-zinc-500 max-w-xl text-sm">
          Ace your upcoming interviews by browsing, reading, and practicing with our interactive, AI-backed questions repository.
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 border-gray-200 focus-visible:ring-primary rounded-xl"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/25 scale-105"
                    : "bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/60"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const hasResult = !!evaluationResults[q.id];
            const result = evaluationResults[q.id];
            const isEvaluating = loadingStates[q.id];

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-zinc-900 border rounded-2xl transition-all duration-300 ${
                  isExpanded
                    ? "border-primary/50 shadow-md ring-1 ring-primary/10"
                    : "border-gray-200/80 hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                {/* Header/Question Strip */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-5 md:p-6 flex items-center justify-between cursor-pointer select-none gap-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <span className="text-sm font-bold text-primary/80 uppercase tracking-wider bg-primary/5 px-2.5 py-1 rounded-md max-w-fit">
                      {q.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                    <h3 className="font-bold text-gray-800 dark:text-zinc-100 text-base md:text-lg">
                      {q.question}
                    </h3>
                  </div>
                  <div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-6 md:px-6 md:pb-8 border-t border-gray-100 dark:border-zinc-800 pt-6 space-y-6 animate-fadeIn">
                    
                    {/* Reference Answer */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" /> Reference Answer
                      </h4>
                      <p className="text-gray-600 dark:text-zinc-300 leading-relaxed bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl text-sm border border-gray-100 dark:border-zinc-800">
                        {q.answer}
                      </p>
                    </div>

                    {/* Quick Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500" /> Key Tips & Concepts
                        </h4>
                        <ul className="space-y-2 bg-amber-50/40 dark:bg-amber-950/10 p-4 rounded-xl border border-amber-100/60 dark:border-amber-900/20 text-sm">
                          {q.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-gray-600 dark:text-zinc-300">
                              <span className="text-amber-500 font-bold mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Example Answer */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-500" /> Example Response
                        </h4>
                        <div className="bg-purple-50/30 dark:bg-purple-950/10 p-4 rounded-xl border border-purple-100/50 dark:border-purple-900/20 text-sm text-gray-600 dark:text-zinc-300 italic">
                          "{q.example}"
                        </div>
                      </div>
                    </div>

                    {/* AI Practising and Evaluation section */}
                    <div className="border-t border-dashed border-gray-200 dark:border-zinc-800 pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
                          <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" /> Practice & Get AI Feedback
                        </h4>
                        <span className="text-xs text-gray-400">Powered by Gemini AI</span>
                      </div>

                      <Textarea
                        placeholder="Type your own answer here..."
                        value={userAnswers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="min-h-[100px] border-gray-200 rounded-xl"
                      />

                      <div className="flex justify-end">
                        <Button 
                          onClick={() => evaluateAnswer(q)} 
                          disabled={isEvaluating || !userAnswers[q.id]?.trim()}
                          className="rounded-xl flex items-center gap-2"
                        >
                          {isEvaluating ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" /> Evaluating...
                            </>
                          ) : (
                            <>
                              <Award className="h-4 w-4" /> Check Answer
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Evaluation Results */}
                      {hasResult && (
                        <div className="bg-primary/5 dark:bg-zinc-800/80 p-5 rounded-2xl border border-primary/20 space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between border-b border-primary/10 pb-2.5">
                            <div className="flex items-center gap-2 text-primary font-bold">
                              <Award className="h-5 w-5" /> Evaluation Score
                            </div>
                            <div className="bg-primary text-white font-extrabold text-lg px-3 py-1 rounded-xl">
                              {result.rating}/10
                            </div>
                          </div>

                          <div className="text-sm">
                            <span className="font-bold text-gray-700 dark:text-zinc-200">Feedback: </span>
                            <span className="text-gray-600 dark:text-zinc-300">{result.feedback}</span>
                          </div>

                          {result.improvementTips && result.improvementTips.length > 0 && (
                            <div className="text-sm space-y-1.5">
                              <span className="font-bold text-gray-700 dark:text-zinc-200">How to improve:</span>
                              <ul className="space-y-1 pl-1">
                                {result.improvementTips.map((tip, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-zinc-300">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-800">
            <p className="text-gray-500 font-medium">No questions found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;
