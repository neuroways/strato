SELECT COUNT(*) AS cards FROM nb_card; -- 78
SELECT COUNT(*) AS texts FROM nb_card_text; -- 156
SELECT audience_code,language_code,COUNT(*) AS texts FROM nb_card_text GROUP BY audience_code,language_code;
SELECT card_id,COUNT(*) AS variants FROM nb_card_text GROUP BY card_id HAVING COUNT(*)<>2;
SELECT COUNT(*) AS missing_card_refs FROM nb_card_text t LEFT JOIN nb_card c ON c.card_id=t.card_id WHERE c.card_id IS NULL;
