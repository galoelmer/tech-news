import { Text } from "react-native";
import styles from "./styles";

function selectEveryTwoSentences(text: string) {
  const sentences = text.split(/[.]+\s/);
  const selectedSentences = [];

  for (let i = 0; i < sentences.length; i += 2) {
    if (i === 0) {
      selectedSentences.push(sentences[i].trim() + ".");
    } else {
      const nextSentence = sentences.slice(i, i + 2);
      selectedSentences.push(nextSentence.join(". ").trim() + ".");
    }
  }

  const lastSentence = selectedSentences.at(-1)?.replace(/\.$/, "");
  selectedSentences[selectedSentences.length - 1] = lastSentence ?? "";

  return selectedSentences;
}

const NewsBodyText = ({ text }: { text: string }) => {
  const selectedSentences = selectEveryTwoSentences(text);

  return (
    <>
      {selectedSentences.map((sentence, index) => (
        <Text key={index} style={styles.body}>
          {sentence}
        </Text>
      ))}
    </>
  );
};

export default NewsBodyText;
