import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import { app, auth, database } from '../src/config/config';

import { getFirestore, doc, getDoc} from 'firebase/firestore';
import { ref, set, onValue, update, query, endAt, orderByValue, get} from 'firebase/database';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';



const Block = ({
  index,
  guess,
  word,
  guessed,
}) => {
  const letter = guess[index];
  const wordLetter = word[index];

  const blockStyles = [styles.guessSquare];
  const textStyles = [styles.guessLetter];

  if (letter === wordLetter && guessed) {
    blockStyles.push(styles.guessCorrect);
    textStyles.push(styles.guessedLetter);
  } else if (word.includes(letter) && guessed) {
    blockStyles.push(styles.guessInWord);
    textStyles.push(styles.guessedLetter);
  } else if (guessed) {
    blockStyles.push(styles.guessNotInWord);
    textStyles.push(styles.guessedLetter);
  }

  return (
    <View style={blockStyles}>
      <Text style={textStyles}>{letter}</Text>
    </View>
  );
};

const GuessRow = ({
  guess,
  word,
  guessed,
}) => {
  return (
    <View style={styles.guessRow}>
      <Block index={0} guess={guess} word={word} guessed={guessed} />
      <Block index={1} guess={guess} word={word} guessed={guessed} />
      <Block index={2} guess={guess} word={word} guessed={guessed} />
      <Block index={3} guess={guess} word={word} guessed={guessed} />
      <Block index={4} guess={guess} word={word} guessed={guessed} />
    </View>
  );
};

const KeyboardRow = ({
  letters,
  onKeyPress,
}) => (
  <View style={styles.keyboardRow}>
    {letters.map((letter) => (
      <TouchableOpacity onPress={() => onKeyPress(letter)} key={letter}>
        <View style={styles.key}>
          <Text style={styles.keyLetter} adjustsFontSizeToFit>
            {letter}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Keyboard = ({ onKeyPress }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"];

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={() => onKeyPress("ENTER")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter} adjustsFontSizeToFit>
              ENTER
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={() => onKeyPress("ENTERVIP")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter} adjustsFontSizeToFit>
              ENTER VIP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const words = [
  "BANAN",
  "ROWER",
  "KOZAK",
  "DRZWI",
  "ZEGAR",
  "KREDA",
  "KARTA",
  "KWIAT",
  "BATON",
  "TRAWA",
  "LAMPA",
  "OBRAZ",
  "AUTOR",
  "SOSNA",
  "ULICA",
  "SERCE",
  "WOREK",
  "SANKI",
  "BOMBA",
  "MLEKO",
];

const defaultGuess = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
};

const GameScreen = () => {
  const [activeWord, setActiveWord] = React.useState(words[0]);
  const [guessIndex, setGuessIndex] = React.useState(0);
  const [guesses, setGuesses] = React.useState(defaultGuess);
  const [gameComplete, setGameComplete] = React.useState(false);

  const currUserData = useSelector(state => state.user);
  const currRoomData = useSelector(state => state.room);

  const navigation = useNavigation();

  const generateRandomRooms = () => {
    console.log("START!");
    for(var i = 0; i < 20; i++){
      console.log(i);
      setActiveWord(words[Math.floor(Math.random() * words.length)]);
      var tempRoomId;
      do {
        tempRoomId = generateRoomId(currUserData.uid);
      } while (!isUniqueId(tempRoomId));

      set(ref(database, 'rooms/' + tempRoomId), {
        roomId: tempRoomId,
        owner: currUserData
      });
      set(ref(database, "rooms/" + tempRoomId + "/owner/game1/gameName"), "wordle");
      for(var j = 0; j < 6; j++){
        var guessVip = words[Math.floor(Math.random() * words.length)];
        set(ref(database, "rooms/" + tempRoomId + "/owner/game1/guess" + j), guessVip);
        if(guessVip === activeWord) {
          set(ref(database, "rooms/" + tempRoomId + "/owner/game1/result"), "won");
          break;
        }else if(j == 5){
          set(ref(database, "rooms/" + tempRoomId + "/owner/game1/result"), "lose");
        }
      }
    }
    console.log("KONIEC!");
  };

  const countRooms = async () => {
    const roomsRef = ref(database, 'rooms/');
    let count = 0;
    onValue(roomsRef, (snapshot) =>{
      snapshot.forEach((childSnapshot) => {
        count++;
      })
    })
    console.log("liczba pokoi: " + count);;
  };

  const isUniqueId = async (tempRoomId) => {
    const roomRef = ref(database, 'rooms/' + tempRoomId);
    const snapshot = await get(roomRef);
    return !snapshot.exists();
  };

  const generateRoomId = (userUid) => {
    let urid = [];
    const timestamp = Date.now();
    const combinedValue = userUid + timestamp;
    for (let i = 0; i< 10; i++){
      urid.push(combinedValue[Math.floor(Math.random() * combinedValue.length)]);
    }
    return urid.join('');
  };

  const handleKeyPress = (letter) => {
    const guess = guesses[guessIndex];

    if (letter === "ENTER") {
      set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/guess" + guessIndex), guess);
      if (guess.length !== 5) {
        alert("Słowo jest za krótkie.");
        return;
      }

      if (guess === activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/result"), "won");
        alert("Wygrałeś!");
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGameComplete(true);
        set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/result"), "lose");
        alert("Przegrałeś!");
        return;
      }
    }

    if (letter === "ENTERVIP") {
      const guessVip = words[Math.floor(Math.random() * words.length)];
      set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/guess" + guessIndex), guessVip);
      setGuessIndex(guessIndex + 1);
      setGuesses({ ...guesses, [guessIndex]: guessVip });

      if (guessVip === activeWord) {
        console.log(activeWord);
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/result"), "won");
        alert("Wygrałeś!");
        return;
      }

      if (guessIndex < 5) {
        console.log(guessIndex);
        setGuessIndex(guessIndex + 1);
      } else {
        setGameComplete(true);
        set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/result"), "lose");
        alert("Przegrałeś!");
        return;
      }
    }

    if (letter === "⌫") {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) });
      return;
    }

    // Nie dodawaj, jeśli zgadywanie jest pełne
    if (guess.length >= 5) {
      return;
    }

    //setGuesses({ ...guesses, [guessIndex]: guess + letter });
  };

  React.useEffect(() => {
    if (!gameComplete) {
      setActiveWord(words[Math.floor(Math.random() * words.length)]);
      setGuesses(defaultGuess);
      setGuessIndex(0);
      set(ref(database, "rooms/" + currRoomData.roomId + "/owner/game1/gameName"), "wordle");
    }
  }, [gameComplete]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GuessRow
          guess={guesses[0]}
          word={activeWord}
          guessed={guessIndex > 0}
        />
        <GuessRow
          guess={guesses[1]}
          word={activeWord}
          guessed={guessIndex > 1}
        />
        <GuessRow
          guess={guesses[2]}
          word={activeWord}
          guessed={guessIndex > 2}
        />
        <GuessRow
          guess={guesses[3]}
          word={activeWord}
          guessed={guessIndex > 3}
        />
        <GuessRow
          guess={guesses[4]}
          word={activeWord}
          guessed={guessIndex > 4}
        />
        <GuessRow
          guess={guesses[5]}
          word={activeWord}
          guessed={guessIndex > 5}
        />
      </View>
      <View>
        {gameComplete ? (
          <View style={styles.gameCompleteWrapper}>
           
              <Text style={styles.bold}>Poprawne słowo: {activeWord}</Text> 
          
            <View>
              <Button
                title="Wyjdź"
                onPress={() => {
                  setGameComplete(false);
                  navigation.navigate('Dashboard');
                }}
              />
            </View>
          </View>
        ) : null}
        <View>
              <Button
                title="Generator"
                onPress={generateRandomRooms}
              />
            </View>
      </View>  
        <Keyboard onKeyPress={handleKeyPress} />  
      </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  guessSquare: {
    borderColor: "#d3d6da",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  guessLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#878a8c",
  },
  guessedLetter: {
    color: "#fff",
  },
  guessCorrect: {
    backgroundColor: "#6aaa64",
    borderColor: "#6aaa64",
  },
  guessInWord: {
    backgroundColor: "#c9b458",
    borderColor: "#c9b458",
  },
  guessNotInWord: {
    backgroundColor: "#787c7e",
    borderColor: "#787c7e",
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  keyboard: {
    flexDirection: "column",
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "#d3d6da",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: "500",
    fontSize: 15,
  },
  gameCompleteWrapper: {
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});

