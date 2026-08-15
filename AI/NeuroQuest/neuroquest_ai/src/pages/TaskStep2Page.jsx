import PageStructure from "../components/PageStructure";

export default function TaskStep2Page({ day, sentence, onContinue }) {
  return (
    <PageStructure
      day={day}
      sentence={sentence}
      title="✏️ Schreibe den Satz ab"
      instruction="Jetzt schreibst du deinen Satz sorgfältig auf."
      detail="Schreib in dein Heft — hier findest du keine Eingabefelder."
      lumiText="Es geht nicht um Geschwindigkeit. Es geht um Sorgfalt. Nimm dir alle Zeit, die du brauchst."
      onContinue={onContinue}
    />
  );
}
