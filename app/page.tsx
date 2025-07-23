"use client";
import { useState } from "react";
import { AutoSuggestion } from "autosuggestion-kit";
import type { SuggestionItem } from "autosuggestion-kit";

// Sample data
const fruits: SuggestionItem[] = [
  { id: 1, label: "Apple", metadata: { category: "Fruit" } },
  { id: 2, label: "Banana", metadata: { category: "Fruit" } },
  { id: 3, label: "Cherry", metadata: { category: "Fruit" } },
  { id: 4, label: "Date", metadata: { category: "Fruit" } },
  { id: 5, label: "Elderberry", metadata: { category: "Fruit" } },
  { id: 6, label: "Fig", metadata: { category: "Fruit" } },
  { id: 7, label: "Grape", metadata: { category: "Fruit" } },
  { id: 8, label: "Honeydew", metadata: { category: "Fruit" } },
];

const trendingSearches: SuggestionItem[] = [
  {
    id: "trending-1",
    label: "Popular searches",
    metadata: { category: "Trending" },
  },
  {
    id: "trending-2",
    label: "Latest updates",
    metadata: { category: "Trending" },
  },
  {
    id: "trending-3",
    label: "Best practices",
    metadata: { category: "Trending" },
  },
];

// Simulate API fetch
const fetchSuggestions = async (query: string): Promise<SuggestionItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

  return fruits
    .filter((fruit) => fruit.label.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5); // limit suggestions to 5
};

export default function Demo() {
  const [selectedItem, setSelectedItem] = useState<SuggestionItem | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      {/* Global box-sizing reset */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }
            /* Ensure full-page background and remove default margin */
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* Gradient background for the entire page */
  body {
    background: linear-gradient(120deg, #f8fafc 0%, #d2dfefff 100%);
    color: black;
    // min-height: 100vh;
  }
      `}</style>

      <div
        style={{
          // minHeight: "100%", 
          padding: "2rem",
          // backgroundColor: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#1e293b",
            }}
          >
            AutoSuggestion Kit Demo
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginBottom: "3rem",
              fontSize: "1.1rem",
            }}
          >
            Effortlessly add a lightweight, headless autosuggestion component to your React
            apps with seamless built-in history and trending search support—boost user experience
            and productivity instantly
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#1e293b",
              }}
            >
              Basic Example with Static Data
            </h2>
             <p
              style={{
                marginTop: "0.10rem",
                fontSize: "1.0rem",
                color: "#64748b",
                fontStyle: "bold",
                userSelect: "none",
              }}
            >
              Keyboard navigation supported: Use the ↑ ↓ arrow keys to browse suggestions and Enter to
              select
            </p>
            <AutoSuggestion
              suggestions={fruits}
              defaultSuggestions={trendingSearches}
              showDefaultOnFocus={true}
              enableHistory={true}
              historyKey="fruits-demo"
              placeholder="Search for fruits..."
              onSelect={(item: SuggestionItem) => {
                setSelectedItem(item);
                console.log("Selected:", item);
              }}
              onChange={(value: string) => {
                setInputValue(value);
                console.log("Input changed:", value);
              }}
              styles={{
                container: { marginBottom: "1rem" },
              }}
            />

            {selectedItem && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#e0f2fe",
                 
                  borderRadius: "8px",
                  marginTop: "1rem",
                }}
              >
                <strong>Selected:</strong> {selectedItem.label}
                {selectedItem.metadata?.category && (
                  <span style={{ marginLeft: "8px", color: "#64748b" }}>
                    ({selectedItem.metadata.category})
                  </span>
                )}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.25rem",
              
                color: "#1e293b",
              }}
            >
              Async Example with API Simulation
            </h2>
           
            <AutoSuggestion
              fetchSuggestions={fetchSuggestions}
              enableHistory={true}
              historyKey="async-demo"
              placeholder="Search fruits (async)..."
              debounceMs={300}
              minQueryLength={1}
              onSelect={(item: SuggestionItem) => {
                console.log("Async selected:", item);
              }}
              styles={{
                input: {
                  borderColor: "#e1e8e5ff",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
