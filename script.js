const gameBoard = (() => {
    const board = ['','','','','','','','','',''];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] === ''){
            board[index] = marker;
            return true;
        } else {
            return false;
        }
    };

    const resetBoard = () => {
        board.fill('');
    };

    return {
        board,
        updateBoard,
        resetBoard
    };
})();

const player = (name, marker) => {
    return {
        name,
        marker
    };
};