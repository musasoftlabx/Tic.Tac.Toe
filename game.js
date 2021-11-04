const readline = require("readline");

const TicTacToe = function (readline) {
  let ReadLine = null,
    BoardSize = 3,
    BoardData = {},
    PlayerMarkers = ["x", "o"],
    players = [];

  const Initialize = (readline) =>
    (ReadLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    }));

  Initialize(readline);

  const CreateTheBoard = () => {
    let data = {
      board: [],
      empty: [],
    };

    for (let i = 0; i < BoardSize; i += 1) {
      let row = [];

      for (let k = 0; k < BoardSize; k += 1) {
        row.push(null);
        data.empty.push(i + " " + k);
      }

      data.board.push(row);
    }

    BoardData = data;
  };

  const SetupPlayers = (PlayerTypes) => {
    let InitialIndex = 0;

    if (PlayerTypes.length === 2) {
      InitialIndex = Math.round(Math.random());

      players = [
        {
          marker: PlayerMarkers[InitialIndex],
          type: PlayerTypes[0],
        },
        {
          marker: PlayerMarkers[!InitialIndex | 0],
          type: PlayerTypes[1],
        },
      ];
    }
  };

  const ChangePlayers = () => {
    players.push(players.shift());
  };

  const GetEachPlayerMove = () => {
    let pos = [];
    players[0].type === "server"
      ? (pos = ServerMove(AddPlayerToTheBoard))
      : (pos = GetPositionFromInput(AddPlayerToTheBoard));
  };

  const ServerMove = (callback) => {
    let index = -1,
      pos = [];

    index = Math.floor(Math.random() * BoardData.empty.length - 0);
    pos = GetPositionFromString(BoardData.empty[index]);

    setTimeout(() => callback(pos), 1000);
  };

  const GetPositionFromInput = (callback) => {
    ReadLine.question(
      "Player " + players[0].marker + "'s move (enter row column): ",
      function (input) {
        BoardData.empty.indexOf(input) != -1
          ? callback(GetPositionFromString(input))
          : GetPositionFromInput(callback);
      }
    );
  };

  const GetPositionFromString = (str) => {
    let pos = str.split(" ");
    pos.forEach((el, i, arr) => (arr[i] = parseInt(el)));
    return pos;
  };

  const AddPlayerToTheBoard = (pos) => {
    AddToBoard(players[0], pos);

    console.log("\u001b[2J\u001b[0;0H");
    PrintBoard();

    if (BoardData.empty.length == 0) {
      console.log("Draw!");
      ReadLine.close();
      return;
    }

    if (CheckBoard(players[0])) {
      ReadLine.close();
      return;
    } else {
      ChangePlayers();
      GetEachPlayerMove(players[0]);
    }
  };

  const AddToBoard = (player, pos) => {
    let EmptyIndex = -1;

    // Add the player's position to the board
    BoardData.board[pos[0]][pos[1]] = player.marker;

    // Remove this position from the array of empty cells
    EmptyIndex = BoardData.empty.indexOf(pos[0] + " " + pos[1]);
    BoardData.empty.splice(EmptyIndex, 1);
  };

  const PrintBoard = () => {
    let divider = "+-----------+";

    for (let i = 0; i < 3; i += 1) {
      console.log(divider);
      let row = "|";

      for (let k = 0; k < 3; k += 1) {
        if (BoardData.board[i][k]) row += " " + BoardData.board[i][k] + " |";
        else row += "   |";
      }
      console.log(row);
    }
    console.log(divider);
  };

  const CheckBoard = (player) => {
    let board = BoardData.board,
      PlayerString = player.marker + player.marker + player.marker,
      winner = null,
      ColumnStrings = ["", "", ""],
      DiagonalStrings = ["", ""];

    for (let i = 0; i < 3; i += 1) {
      // Check each row for a winner
      let RowString = board[i].join("");

      if (RowString === PlayerString) {
        winner = player;
        break;
      }

      // Build a string of column values
      for (var k = 0; k < 3; k += 1) {
        ColumnStrings[k] += board[i][k];
      }

      // Build a string of diagonal values
      if (i === 0) {
        DiagonalStrings[0] += board[i][0];
        DiagonalStrings[1] += board[i][2];
      } else if (i == 1) {
        DiagonalStrings[0] += board[i][1];
        DiagonalStrings[1] += board[i][1];
      } else if (i == 2) {
        DiagonalStrings[0] += board[i][2];
        DiagonalStrings[1] += board[i][0];
      }
    }

    // Check the column strings for a winner
    if (ColumnStrings.indexOf(PlayerString) > -1) {
      winner = player;
    }

    // Check the diagonals for a winner
    if (DiagonalStrings.indexOf(PlayerString) > -1) {
      winner = player;
    }

    if (winner) {
      console.log(winner.marker + " wins!");
      return true;
    }

    return false;
  };

  return {
    start: (PlayerTypes) => {
      CreateTheBoard();
      SetupPlayers(PlayerTypes);
      players[0].marker !== "x" && ChangePlayers();
      GetEachPlayerMove();
    },
    GetPlayers: () => players,
  };
};

let ticTacToe = new TicTacToe(readline);
ticTacToe.start(["me", "server"]);
