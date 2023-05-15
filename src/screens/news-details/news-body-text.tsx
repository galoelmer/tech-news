import { Text, View } from 'react-native';

import styles, { ids } from './styles';

function selectEveryTwoSentences(text: string) {
  const sentences = text.split(/[.]+\s/);
  const selectedSentences = [];

  for (let i = 0; i < sentences.length; i += 2) {
    if (i === 0) {
      selectedSentences.push(sentences[i].trim() + '.');
    } else {
      const nextSentence = sentences.slice(i, i + 2);
      selectedSentences.push(nextSentence.join('. ').trim() + '.');
    }
  }

  const lastSentence = selectedSentences.at(-1)?.replace(/\.$/, '');
  selectedSentences[selectedSentences.length - 1] = lastSentence ?? '';

  return selectedSentences;
}

const NewsBodyText = ({ text }: { text: string }) => {
  const selectedSentences = selectEveryTwoSentences(text);

  return (
    <View style={{ marginBottom: 100 }}>
      {selectedSentences.map((sentence, index) => (
        <Text key={index} style={styles.body} dataSet={{ media: ids.body }}>
          {sentence}
        </Text>
      ))}
    </View>
  );
};

export default NewsBodyText;
