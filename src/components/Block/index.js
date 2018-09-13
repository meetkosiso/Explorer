import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlock } from '../../actions';
import { withRouter } from 'react-router'
import './style.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    textAlign: 'center',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class Block extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    var hash = nextProps.match.params.hash;
    this.props.fetchBlock(hash);
  }

  componentDidMount() {
    console.log('componentDidMount');
    var hash = this.props.match.params.hash;
    this.props.fetchBlock(hash);
  }

  render() {
    const { classes } = this.props;
    if (!this.props.block) {
      return (
        <div className="Block">
          <h2>Block Info</h2>
        </div>
      );
    } else {
      console.log('Rendering block', this.props.block);
    }

    const block = this.props.block;
    const difficulty = parseInt(block.difficulty, 10);
    const difficultyTotal = parseInt(block.totalDifficulty, 10);
    const blockTimestamp = Date(parseInt(block.timestamp, 10)).toString();
    const blockTransactions = '';// parseInt(block.transactions.slice().length, 10);

    return (
      <div className="Bloc">
        <h2>Block Info</h2>
        <Paper className={classes.root}>
     <Table className={classes.table}>
       <TableHead>
         <TableRow>

         </TableRow>
       </TableHead>
       <TableBody>
       <TableRow>
         <TableCell component="th" scope="row">
           Height
         </TableCell>
         <TableCell numeric>{block.ids}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell component="th" scope="row">Timestamp</TableCell>
         <TableCell numeric>{blockTimestamp}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell component="th" scope="row">Hash</TableCell>
         <TableCell numeric>{block.hash}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell component="th" scope="row">Parent Hash</TableCell>
         <TableCell numeric><Link to={`../block/${block.parentHash}`}>
           {block.parentHash}
         </Link></TableCell>
       </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Nonce</TableCell>
           <TableCell numeric>{block.nonce}</TableCell>
         </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Size</TableCell>
           <TableCell numeric>{block.size}</TableCell>
         </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Difficulty</TableCell>
           <TableCell numeric>{difficulty}</TableCell>
         </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Difficulty</TableCell>
           <TableCell numeric>{difficultyTotal}</TableCell>
         </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Gas Limit</TableCell>
           <TableCell numeric>{block.gasLimit}</TableCell>
         </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Gas Used</TableCell>
           <TableCell numeric>{block.gasUsed}</TableCell>
         </TableRow>
         <TableRow>
           <TableCell component="th" scope="row">Sha3Uncles</TableCell>
           <TableCell numeric>{block.sha3Uncles}</TableCell>
         </TableRow>
       </TableBody>
     </Table>
   </Paper>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  console.log('Block mapStateToProps state', state);
  console.log('Block mapStateToProps ownProps', ownProps);
  return {
    block: state.block,
  };
}

export default withRouter(connect(mapStateToProps, { fetchBlock })(withStyles(styles)(Block)));
