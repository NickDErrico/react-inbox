import React, { Component } from 'react'

class Toolbar extends Component {
  render () {

    // SETS DEFAULT SELECTED STYLING :
    let selectButtonClass = "fa-square-o"

    // FILTERS THROUGH MESSAGES TO ONLY HAVE THOSE THAT ARE SELECTED :
    let messagesSelected = this.props.messages.filter(message => message.selected);

    // IF STATEMENT FOR STYLING OF SELECTED/UNSELECTED :
    if (messagesSelected.length === this.props.messages.length) {
      selectButtonClass = "fa-check-square-o";
    } else if (messagesSelected[0]) {
      selectButtonClass = "fa-minus-square-o";
    }

    // FILTERS THROUGH MESSAGES TO FIND ALL UNREAD TO DISPLAY COUNT :
    let countedUnread = this.props.messages.filter(msg => !msg.read).length;

    let countedSelected = this.props.messages.reduce((acc, val) => acc + !!val.selected, 0)

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span
              className="badge badge"
            >
              {countedUnread}
            </span>
              {/* SYNTAX FOR WHETHER THEIR ARE MULTIPLE/ZERO UNREAD MESSAGES OR 1 UNREAD MESSAGE*/}
              {countedUnread > 1 || countedUnread < 1 ? 'unread messages' : 'unread message'}
          </p>

          <button
            className="btn btn-danger"
            // OPEN/CLOSE COMPOSE FORM ON CLICK :
            onClick={this.props.toggleComposeForm}
          >
            <i className="fa fa-plus"></i>
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.selectButtonFunc(selectButtonClass)}
            disabled={!countedSelected}
          >
            <i className={`fa ${selectButtonClass}`}></i>
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.setReadFunc()}
            disabled={!countedSelected}
            >
              Mark As Read
            </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.setUnreadFunc()}
            disabled={!countedSelected}
          >
              Mark As Unread
            </button>

          <select
            className="form-control label-select"
            onChange={(e) => this.props.addLabel(e.target.value)}
            disabled={!countedSelected}
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select
            className="form-control label-select"
            onChange={(e) => this.props.removeLabel(e.target.value)}
            disabled={!countedSelected}
          >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button
            className="btn btn-default"
            onClick={() => this.props.deleteMessages()}
            disabled={!countedSelected}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
