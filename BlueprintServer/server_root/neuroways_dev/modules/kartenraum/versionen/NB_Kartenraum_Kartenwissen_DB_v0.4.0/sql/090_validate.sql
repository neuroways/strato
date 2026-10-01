SELECT COUNT(*) AS knowledge_rows FROM nb_card_knowledge;
SELECT audience_code,language_code,COUNT(*) AS rows_count
FROM nb_card_knowledge GROUP BY audience_code,language_code;
SELECT card_id,COUNT(*) AS variants
FROM nb_card_knowledge
WHERE language_code='de'
GROUP BY card_id HAVING COUNT(*)<>2;
SELECT COUNT(*) AS missing_card_refs
FROM nb_card_knowledge k LEFT JOIN nb_card c ON c.card_id=k.card_id
WHERE c.card_id IS NULL;
