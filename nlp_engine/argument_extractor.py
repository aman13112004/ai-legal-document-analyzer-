import spacy

nlp = spacy.load("en_core_web_sm")

ARGUMENT_CUES = [
    "it is argued",
    "the petitioner contends",
    "the respondent submits",
    "it was claimed"
]

def extract_arguments(text):
    arguments = []
    doc = nlp(text.lower())

    for sent in doc.sents:
        for cue in ARGUMENT_CUES:
            if cue in sent.text:
                arguments.append(sent.text.strip())

    return arguments

def extract_facts(text):
    facts = []
    for line in text.split("."):
        if any(word in line.lower() for word in [
            "entered into",
            "agreement",
            "contract",
            "facts",
            "dispute"
        ]):
            facts.append(line.strip())
    return facts[:5]
