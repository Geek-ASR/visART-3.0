
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FunctionSquare, Code2, Terminal, PlayCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Prism from 'prismjs';
import { ClientOnly } from '@/components/layout/ClientOnly';

// Helper to escape HTML for initial display before highlighting
function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const pseudoCode = {
  access: `FUNCTION getElement(array, index)
  IF index < 0 OR index >= length(array) THEN
    RETURN error "Index out of bounds"
  ELSE
    RETURN array[index]
  END IF
END FUNCTION`,
  insertEnd: `FUNCTION insertAtEnd(array, element)
  // Assuming dynamic array or enough capacity
  array[length(array)] = element // conceptually, actual implementation varies
  INCREMENT length(array)
  RETURN array
END FUNCTION`,
  insertMiddle: `FUNCTION insertAtIndex(array, index, element)
  IF index < 0 OR index > length(array) THEN
    RETURN error "Index out of bounds for insertion"
  END IF
  // Shift elements to the right
  FOR i FROM length(array) DOWNTO index + 1
    array[i] = array[i-1]
  END FOR
  array[index] = element
  INCREMENT length(array)
  RETURN array
END FUNCTION`,
  delete: `FUNCTION deleteAtIndex(array, index)
  IF index < 0 OR index >= length(array) THEN
    RETURN error "Index out of bounds"
  END IF
  // Shift elements to the left
  FOR i FROM index TO length(array) - 2
    array[i] = array[i+1]
  END FOR
  DECREMENT length(array)
  // Optionally, clear the last element if managing fixed-size underlying storage
  RETURN array
END FUNCTION`,
  search: `FUNCTION linearSearch(array, targetElement)
  FOR i FROM 0 TO length(array) - 1
    IF array[i] == targetElement THEN
      RETURN i // Element found at index i
    END IF
  END FOR
  RETURN -1 // Element not found
END FUNCTION`,
};

const pseudoCodeTitles: Record<keyof typeof pseudoCode, string> = {
  access: "Accessing Element",
  insertEnd: "Insertion at End",
  insertMiddle: "Insertion at Index",
  delete: "Deletion at Index",
  search: "Linear Search",
};


const codeExamples = {
  cpp: {
    code: `#include <iostream>
#include <vector> // Using vector for dynamic array behavior

int main() {
    // Declaration and Initialization
    std::vector<int> arr = {10, 20, 30, 40, 50};

    // Accessing an element
    std::cout << "Element at index 2: " << arr[2] << std::endl;

    // Adding an element to the end
    arr.push_back(60);

    // Iterating and printing elements
    std::cout << "Array elements: ";
    for (int i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}`,
    output: `Element at index 2: 30
Array elements: 10 20 30 40 50 60`,
  },
  python: {
    code: `# Declaration and Initialization (Python lists are dynamic arrays)
arr = [10, 20, 30, 40, 50]

# Accessing an element
print(f"Element at index 2: {arr[2]}")

# Adding an element to the end
arr.append(60)

# Iterating and printing elements
print("Array elements:", end=" ")
for element in arr:
    print(element, end=" ")
print()`,
    output: `Element at index 2: 30
Array elements: 10 20 30 40 50 60`,
  },
  java: {
    code: `import java.util.ArrayList;
import java.util.Arrays;

public class ArrayExample {
    public static void main(String[] args) {
        // Using ArrayList for dynamic array behavior
        // For fixed-size arrays: int[] arr = new int[]{10, 20, 30, 40, 50};
        ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50));

        // Accessing an element
        System.out.println("Element at index 2: " + arr.get(2));

        // Adding an element to the end
        arr.add(60);

        // Iterating and printing elements
        System.out.print("Array elements: ");
        for (int i = 0; i < arr.size(); i++) {
            System.out.print(arr.get(i) + " ");
        }
        System.out.println();
    }
}`,
    output: `Element at index 2: 30
Array elements: 10 20 30 40 50 60`,
  },
};

type LanguageKey = keyof typeof codeExamples;

export default function ArrayAlgorithmCodePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('cpp');
  const [languagesLoaded, setLanguagesLoaded] = useState(false);

  // Initialize state for highlighted HTML strings
  const initialPseudoHtml: Record<string, string> = {};
  for (const key in pseudoCode) {
    initialPseudoHtml[key] = escapeHtml(pseudoCode[key as keyof typeof pseudoCode]);
  }
  const [highlightedPseudoCode, setHighlightedPseudoCode] = useState<Record<string, string>>(initialPseudoHtml);

  const [highlightedCodeExample, setHighlightedCodeExample] = useState<string>(
    escapeHtml(codeExamples[selectedLanguage as LanguageKey].code)
  );

  useEffect(() => {
    async function loadLanguages() {
      // Dynamically import language components
      await import('prismjs/components/prism-clike');
      await import('prismjs/components/prism-c');
      await import('prismjs/components/prism-cpp');
      await import('prismjs/components/prism-python');
      await import('prismjs/components/prism-java');
      setLanguagesLoaded(true);
    }

    if (typeof window !== 'undefined') { // Ensure this runs only on the client
      loadLanguages();
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Effect to highlight pseudo-code
  useEffect(() => {
    if (typeof window !== 'undefined' && languagesLoaded && Prism?.languages?.clike) {
      const newHighlighted: Record<string, string> = {};
      for (const key in pseudoCode) {
        const code = pseudoCode[key as keyof typeof pseudoCode];
        newHighlighted[key] = Prism.highlight(code, Prism.languages.clike, 'clike');
      }
      setHighlightedPseudoCode(newHighlighted);
    }
  }, [languagesLoaded]); // Re-run when languages are loaded

  // Effect to highlight main code example
  useEffect(() => {
    if (typeof window !== 'undefined' && languagesLoaded && Prism?.languages && Prism.languages[selectedLanguage]) {
      const currentCode = codeExamples[selectedLanguage].code;
      setHighlightedCodeExample(Prism.highlight(currentCode, Prism.languages[selectedLanguage], selectedLanguage));
    } else if (typeof window !== 'undefined') { // Fallback before languages are loaded for selected language
      setHighlightedCodeExample(escapeHtml(codeExamples[selectedLanguage].code));
    }
  }, [selectedLanguage, languagesLoaded]);


  const pseudoCodeFallback = (
    <div className="space-y-6">
      {Object.keys(pseudoCode).map((key) => (
        <div key={key}>
          <h3 className="text-lg font-medium text-foreground mb-2">{pseudoCodeTitles[key as keyof typeof pseudoCodeTitles]}</h3>
          <pre className="bg-muted/50 p-4 rounded-md text-sm overflow-x-auto">
            <code className="font-code block whitespace-pre-wrap">
              {pseudoCode[key as keyof typeof pseudoCode]}
            </code>
          </pre>
        </div>
      ))}
    </div>
  );

  const codeImplementationsFallback = (
    <p className="p-4 text-muted-foreground">Loading code examples...</p>
  );


  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
        <Link href="/dashboard/dsa-topics/arrays/exercises">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Array Exercises
        </Link>
      </Button>

      {/* Header */}
      <header className="pb-2 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Arrays: Algorithms &amp; Code Implementations</h1>
        <p className="text-muted-foreground text-lg">
          Explore common array algorithms in pseudo-code and see their implementations in popular languages.
        </p>
      </header>

      <Separator />

      {/* Video Section */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <PlayCircle className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold">Visual Explanation: Arrays Fundamentals</CardTitle>
          </div>
          <CardDescription>Watch this video for a comprehensive introduction to array data structures.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-md border"
              src="https://www.youtube.com/embed/8wmn7k1TTcI"
              title="YouTube video player - Arrays Explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Section */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FunctionSquare className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold">Array Algorithms (Pseudo-code)</CardTitle>
          </div>
          <CardDescription>High-level logic for fundamental array operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ClientOnly fallback={pseudoCodeFallback}>
            {(Object.keys(pseudoCode) as Array<keyof typeof pseudoCode>).map((key) => (
              <div key={key}>
                <h3 className="text-lg font-medium text-foreground mb-2">{pseudoCodeTitles[key]}</h3>
                <pre className="bg-muted/50 p-4 rounded-md text-sm overflow-x-auto">
                  <code
                    className="language-clike font-code block whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlightedPseudoCode[key] }}
                  />
                </pre>
              </div>
            ))}
          </ClientOnly>
        </CardContent>
      </Card>

      {/* Code Implementation Section */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Code2 className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold">Code Implementations</CardTitle>
          </div>
          <CardDescription>Basic array usage examples in C++, Python, and Java.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly fallback={codeImplementationsFallback}>
            <Tabs value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as LanguageKey)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="cpp">C++</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="java">Java</TabsTrigger>
              </TabsList>
              {(Object.keys(codeExamples) as LanguageKey[]).map((lang) => (
                <TabsContent key={lang} value={lang}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-md font-medium text-foreground mb-2">Code:</h4>
                      <ScrollArea className="h-[300px] w-full rounded-md border bg-card">
                        <pre className="!m-0 h-full"> 
                          <code 
                            className={`language-${lang} text-sm font-code block whitespace-pre-wrap`}
                            dangerouslySetInnerHTML={{ __html: lang === selectedLanguage ? highlightedCodeExample : escapeHtml(codeExamples[lang].code) }}
                          />
                        </pre>
                      </ScrollArea>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-foreground mb-1 flex items-center">
                          <Terminal className="h-4 w-4 mr-2 text-muted-foreground" /> Output:
                      </h4>
                      <ScrollArea className="h-[100px] w-full rounded-md border bg-black text-green-400 p-1">
                         <pre className="p-3 text-sm font-code whitespace-pre-wrap">
                           {codeExamples[lang].output}
                         </pre>
                      </ScrollArea>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </ClientOnly>
        </CardContent>
      </Card>
    </div>
  );
}
