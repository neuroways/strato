import PageStructure from "../components/PageStructure";

export default function TaskStep3Page({ day, sentence, onContinue }) {
  return (
    <PageStructure
      day={day}
      sentence={sentence}
      title="🔍 Kontrolliere jedes Wort"
      instruction="Lies deinen Satz noch einmal. Stimmt jedes Wort?"
      detail="Schau ganz genau hin."
      lumiText="Fehler sind deine beste Lehrerin. Sie zeigen dir genau, wo du lernen kannst."
      onContinue={onContinue}
    />
  );
}
