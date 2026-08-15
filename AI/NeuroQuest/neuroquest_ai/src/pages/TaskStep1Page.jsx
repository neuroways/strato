import PageStructure from "../components/PageStructure";

export default function TaskStep1Page({ day, sentence, onContinue }) {
  return (
    <PageStructure
      day={day}
      sentence={sentence}
      title="👀 Prüfe das Satzende"
      instruction="Schau in dein Heft. Wie endet dein Satz?"
      detail="Punkt  •  Fragezeichen  ?  oder  Ausrufezeichen  !"
      lumiText="Schau ganz in Ruhe. Der Satz verrät dir selbst, wie er endet."
      onContinue={onContinue}
    />
  );
}
