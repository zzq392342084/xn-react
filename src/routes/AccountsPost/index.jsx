import React from 'react';
import {connect} from 'react-redux';
import {Table, Button} from 'antd';
import {createAccount} from '../../actions/accounts.action';
import AccountForm from './form';

@connect(state => state.accounts)
class AccountsPostIndex extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired
  }
  
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  formSubmit(data) {
    this.props.dispatch(createAccount(data)).then(res => {
      this.context.router.push('accounts');
    });
  }

  render() {
    return (
      <div>
        <AccountForm formSubmit={this.formSubmit} />
      </div>
    );
  }
}

export default AccountsPostIndex;
