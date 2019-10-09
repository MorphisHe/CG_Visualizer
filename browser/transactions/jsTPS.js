// this is a class that saves stack of transactions for redo and undo
// each transcation will be an object defined by user
// user is in charge of excuting the transcations when its poped

class jsTPS {
    undo_transactions = []; // stack of transactions to undo
    redo_transactions = []; // stack if transactions to redo
    MAX_STACK = 40; // only allowing 20 in each stack

    clearAllTransactions() {
        this.undo_transactions = [];
        this.redo_transactions = [];
    }

    // push the new transaction to the top of the stack
    addTransaction(jsTPS_Transaction) {
        if (this.undo_transactions.length == this.MAX_STACK)
            this.undo_transactions.shift(); // remove the bottom stack to maintain 20 elements
        this.undo_transactions.push(jsTPS_Transaction);
    }

    // pop the transaction at the top of the undo stack
    // and add it to top of redo stack
    popUndoTransaction() {
        if (this.undo_transactions.length != 0) {
            var curTransaction = this.undo_transactions.pop();
            if (this.redo_transactions.length == this.MAX_STACK)
                this.redo_transactions.shift(); // remove the bottom stack to maintain 20 elements
            this.redo_transactions.push(curTransaction);
            return curTransaction;
        }
    }

    // pop the transaction at the top of the redo stack
    // and add it to top of undo stack
    popRedoTransaction() {
        if (this.redo_transactions.length != 0) {
            var curTransaction = this.redo_transactions.pop();
            this.addTransaction(curTransaction);
            return curTransaction;
        }
    }

}