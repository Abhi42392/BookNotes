import fitz
import json
import sys

def extract_highlighted_text(pdf_path):
    doc = fitz.open(pdf_path)
    highlights = []

    for page in doc:
        for annot in page.annots():
            if annot.type[0] == 8:  # Highlight annotation
                quads = annot.vertices  # Get highlight coordinates
                text = []

                if quads:
                    for i in range(0, len(quads), 4):  # Process quad sets
                        rect = fitz.Quad(quads[i:i+4]).rect  # Convert to rectangle
                        words = page.get_text("words")  # Extract all words with positions

                        # Select words within highlight region
                        for w in words:
                            x0, y0, x1, y1, word, *_ = w
                            if rect.intersects(fitz.Rect(x0, y0, x1, y1)):
                                text.append(word)

                # Join words into a clean sentence
                clean_text = " ".join(text).strip()

                if clean_text:  # Avoid empty highlights
                    highlights.append({"highlight": clean_text})

    return highlights

if __name__ == "__main__":
    pdf_file = sys.argv[1]
    highlighted_text = extract_highlighted_text(pdf_file)
    print(json.dumps(highlighted_text))
