import _ from 'lodash';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlockNumber } from '../../actions';
import './style.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';


import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    textAlign: 'center',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blockIds: [],
      blockHashes: [],
      blockNumber: null,
      completed: 0,
      page: 0,
      dataLength: 100,
      rowsPerPage: 10,
      order: 'asc',
      orderBy: 'blocks',
      rows: [],
    };
  }

  // componentWillMount() {
  //   var blockNumber = web3.eth.blockNumber;
  //   console.log('blockNumber:', blockNumber);
  //   this.setState({
  //     blockNumber: blockNumber,
  //   });
  // }

  componentDidMount() {
    this.props.fetchBlockNumber();
    this.timer = setInterval(this.progress, 40);
  }

  componentDidUpdate(){
    this.renderBlocks();
  }

  handleChangePage = (event, page) => {
   this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };


  timer = null;

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  progress = () => {
    const { completed } = this.state;
    const { blocks } = this.props;
    this.setState({ completed: Object.keys(blocks).length !== 0 ? 0 : completed + 1 });
  }

  renderBlocks() {
    const { rows } = this.state;
     const { classes, blocks } = this.props;
    _.each(this.props.blocks.ids, (value, index) => {
      rows.push(
        <TableRow key={index}>
          <CustomTableCell component="th" scope="row">
            {value}
          </CustomTableCell>
          <CustomTableCell component="th" scope="row"><Link to={`/block/${this.props.blocks.hash[index]}`}>
            {blocks.hash[index]}
          </Link></CustomTableCell>
          <CustomTableCell component="th" scope="row">
            {blocks.timestamp[index]}
          </CustomTableCell>
          <CustomTableCell component="th" scope="row">
            {blocks.size[index]}
          </CustomTableCell>
        </TableRow>
      );
    });
    return rows;
  }

  render() {
     const { classes, blocks } = this.props;
    const { rowsPerPage, page, order, orderBy, dataLength, rows } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    return (
      <div className="Hom"><br/><br/>
      <Paper className={classes.root}>
      <CircularProgress
         className={classes.progress}
         variant="determinate"
         value={this.state.completed}
       />

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell><strong>Block No</strong>:</CustomTableCell>
            <CustomTableCell><strong>Block No</strong></CustomTableCell>
            <CustomTableCell><strong>TimeStamp</strong></CustomTableCell>
            <CustomTableCell><strong>Size</strong></CustomTableCell>
          </TableRow>

        </TableHead>

        <TableBody>
        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              //console.log(index)
            return (
                  row
            );
          })}
          {emptyRows > 0 && (
          <TableRow style={{ height: 48 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
        </TableBody>

      </Table>
      <TablePagination
          component="div"
          count={dataLength}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsWrapped}
        />
    </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('Home mapStateToProps state', state);
  return {
    blockNumber: state.blockNumber,
    blocks: state.blocks,
  };
}

export default connect(mapStateToProps, { fetchBlockNumber })(withStyles(styles)(Home));
