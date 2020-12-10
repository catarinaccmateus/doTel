import React from 'react';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, ActivityIndicator, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from 'styles/review';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Review({ navigation: { goBack } }) {
  const [name, setName] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const submitReview = async () => {
    setSubmitting(true);
    setTimeout(async () => {
      try {
        await AsyncStorage.setItem('reviewer_name', name);
      } catch (error) {
        console.log('Error on saving name in async storage', error);
      }
      setSubmitting(false);
      goBack();
    }, 2000);
  };

  React.useEffect(() => {
    async function getNameAsyncStorage() {
      try {
        const savedName = await AsyncStorage.getItem('reviewer_name');
        if (savedName !== null) {
          setName(savedName);
        }
      } catch (error) {
        console.log('Error getting name from async storage', error);
      }
    }
    getNameAsyncStorage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="close" color="#00264d" size={30} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>What was your opinion on your stay?</Text>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          style={styles.reviewInput}
          placeholder="What's your name? (optional)"
        />
        <Text>Rate your experience!</Text>
        <View style={styles.rate}>
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <TouchableOpacity onPress={() => setRate(index)} key={index}>
                <Icon name="star" color={index <= rate ? '#e6b800' : 'gray'} size={30} />
              </TouchableOpacity>
            );
          })}
        </View>
        <TextInput
          value={comment}
          onChangeText={(val) => setComment(val)}
          multiline={true}
          numberOfLines={3}
          style={[styles.reviewInput, styles.largeInput]}
          placeholder="Leave a comment!"
        />
        {submitting && <ActivityIndicator size="large" color={'#000066'} style={styles.loader} />}
        <TouchableOpacity
          style={[{ ...styles.button }, { ...styles.reviewButton }]}
          disabled={submitting}
          onPress={() => submitReview()}
        >
          <Text style={styles.buttonText}>Leave a Review</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
