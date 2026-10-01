# Koan content standards

**Never Fucking cut corners.** The blank should test a meaningful part of the idea, not merely satisfy a layout metric.

- Write the question as one natural sentence. Put blanks in varied positions, including on verbs that express the reasoning or action. Keep some sentence-final blanks when the final concept is genuinely the best answer.
- Do not append a semicolon, em dash, or second sentence just to make a final blank appear internal. Do not use a runtime script to relocate blanks or manufacture variety. Author `before`, `answer`, and `after` directly in the source data.
- Before blanking a verb, list the verbs a learner could reasonably type. If several fit, either accept at least five of them or rewrite the koan so the blank is a noun (or another word with one clear answer). Use verb blanks only when the verb itself is the concept and few alternatives fit, and keep them to about 20% of a set or less.
- Keep the complete sentence accurate, clear, and answerable from the reading. Check the missing word, nearby grammar, explanation, and accepted alternatives together.
- Treat personal chats and pasted examples as authoring input, never as context the learner already has. A koan must supply any scenario or definition needed to answer it, or use a general statement that stands on its own. Review the prompt as someone seeing only that screen.
- Review actual prompts across each reading set, not just aggregate counts. Run `node check-content.js`; its sentence-final limit and artificial-continuation check are safeguards, not substitutes for content review.

## Expounds

- Author an expound as one connected explanation of the current answer. Define unfamiliar terms, work through a concrete example, and explain the consequence or useful distinction.
- Every sentence must advance the explanation. Read it aloud: replace abstract filler such as "judge its signals" with the actual measurement, comparison, or action.
- Do not assemble expounds by concatenating prompts, short explanations, or earlier koans. Shared keywords are not evidence of a meaningful conceptual connection.
- When an earlier idea helps, explain that idea and its relationship in the current paragraph. Do not append the earlier question or assume the learner remembers it.
- Example numbers and scenarios must be clearly illustrative, not presented as requirements from the source.
- Store reviewed prose in `expoundText`; the renderer preserves it and adds the source. Unreviewed entries retain only their current prompt and short explanation as a temporary fallback. That fallback is not a completed editorial rewrite.
