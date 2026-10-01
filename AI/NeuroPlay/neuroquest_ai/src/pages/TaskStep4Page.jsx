import PageStructure from "../components/PageStructure";

export default function TaskStep4Page({ day, sentence, onContinue }) {
  return (
    <PageStructure
      day={day}
      sentence={sentence}
      title="📏 Unterstreiche deinen Satz"
      instruction="Wunderbar! Jetzt unterstreicht du deinen Satz mit Lineal und Stift."
      detail="Mit echtem Stift und Lineal in deinem Heft."
      lumiText="Du bist großartig. Ein Satz fertig. Und die Geschichte wartet schon auf dich…"
      onContinue={onContinue}
    />
  );
}
