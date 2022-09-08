import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native';

const delay = ms => new Promise(res => setTimeout(res, ms));

const App = () => {
  const [notificatoin, setNotification] = useState('Player X Start!');

  const [refresh, setRefresh] = useState(false);

  const [board, setBoard] = useState([ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ]);

  const [currentPlayer, setCurrentPlayer] = useState('X');

  const pressField = index => {
    let newBoard = board;
    if (newBoard[index] !== 'X' && newBoard[index] !== 'O') {
      if (currentPlayer == 'X') {
        newBoard[index] = 'X';
        setCurrentPlayer('O');
        setNotification('Player O to move');
      } else {
        newBoard[index] = 'O';
        setCurrentPlayer('X');
        setNotification('Player X to move');
      }
      setBoard(newBoard);
      setRefresh(!refresh);
      checkIfPlayferWon();
    }
  };

  const checkIfPlayferWon = () => {
    //row 1
    if (board[0] === board[1] && board[1] === board[2] && board[0] != ' ') {
      playerWon(board[0]);
    }
    //row 2
    else if (
      board[3] === board[4] &&  board[4] === board[5] && board[3] != ' ') {
      playerWon(board[3]);
    }
    //row 3
    else if (
      board[6] === board[7] && board[7] === board[8] && board[6] != ' ') {
      playerWon(board[6]);
    }
    //column 1
    else if (
      board[0] === board[3] && board[3] === board[6] && board[0] != ' ') {
      playerWon(board[0]);
    }
    //column 2
    else if (
      board[1] === board[4] && board[4] === board[7] && board[1] != ' ') {
      playerWon(board[1]);
    }
    //column 3
    else if (
      board[2] === board[5] && board[5] === board[8] && board[2] != ' ') {
      playerWon(board[2]);
    }
    //diagonal 1
    else if (
      board[0] === board[4] && board[4] === board[8] && board[0] != ' ') {
      playerWon(board[0]);
    }
    //diagonal 2
    else if (
      board[2] === board[4] && board[4] === board[6] && board[2] != ' ') {
      playerWon(board[2]);
    }
  };

  const playerWon = async symbol => {
    setNotification('Player ' + symbol + ' won!');
    await delay(2000);
    setBoard([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
    if (symbol == 'O') {
      setNotification('Player X to move');
    } else {
      setNotification('Player O to move');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Image source={require('./assets/appBG.png')} style={styles.backgroundImage} />
        <StatusBar
          hidden={false}
          barStyle="dark-content"
          backgroundColor="#0000"
        />
        <Text style={styles.titleText}>TicTacToe</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.innerText}>{notificatoin}</Text>
          <View style={styles.flatlistContainer} >
            <Image source={require('./assets/bg.png')} style={styles.innerImageStyle} />
            <FlatList
              style={styles.list}
              data={board}
              numColumns={3}
              refreshing={true}
              extraData={refresh}
              alignItems="center"
              justifyContent="center"
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.touchableButton}
                  onPress={() => pressField(index)}>
                  <Text style={styles.touchableButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 75,
  },
  innerText: {
    fontWeight: 'bold',
    fontSize: 28,
    position: 'absolute',
    top: 20,
    color: 'white',
  },
  titleImageStyle: {
    flex: 1,
    zIndex: -2,
    position: 'absolute',
  },
  innerImageStyle: {
    height: 300,
    width: 300,
    zIndex: -1,
    position: 'absolute',
  },
  list: {
    width: 300,
    height: 300,
  },
  touchableButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  touchableButtonText: {
    fontSize: 60,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white', 
  },
  flatlistContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 370,
    width: '100%'
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%'
  }
});

export default App;
