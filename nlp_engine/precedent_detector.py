import re

CASE_PATTERN = r"[A-Z][a-zA-Z]+ vs [A-Z][a-zA-Z]+"

def detect_precedents(text):
    return list(set(re.findall(CASE_PATTERN, text)))
