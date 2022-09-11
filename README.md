# stringSimilarity
Compare two strings together and return a score signifying the similarity score.

### This script splits a 2 sentence string into individual sentences and uses multiple similarity algorithms to calculate the similarity between the strings. 

- Levenshtein Distance - calculates the minimum number of operations you must do to change 1 string into another. The higher the number, the less similar the strings are.
- Cosine Similarity - calculates the similarity between two strings using the cosine similarity formula. Cosine similarity is a metric, helpful in determining, how similar the data objects are irrespective of their size. The closer the number is to 1, the more similar the strings are.
- Sorensen Dice - A statistic used to gauge the similarity of two samples. It is equal to twice the number of elements (tokens/words) common to both sets, divided by the sum of the number of elements in each set. It is symmetric and does not require a large number of elements to achieve a high degree of similarity. The higher the number, the more similar the samples are.
- Jaro Winkler - The Jaro–Winkler distance is a string metric measuring an edit distance between two sequences. The lower the Jaro–Winkler distance for two strings is, the more similar the strings are. The Jaro–Winkler distance is a metric that is designed to work with short strings, such as first names, and is based on the Jaro distance, but incorporates a modification to the Winkler modification to account for prefixes.
- Trigram Similarity - A trigram is a group of three consecutive characters taken from a string. We can measure the similarity of two strings by counting the number of trigrams they share. This simple idea turns out to be very effective for measuring the similarity of words in many natural languages. The closer the number is to 100, the more similar the strings are.
