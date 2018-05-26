import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MatchCard } from 'components';

class MatchProfile extends Component {

	componentWillMount() {

	}

	render () {
		return (
			<MatchCard/>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
}

export default connect(mapStateToProps, {
	
})(MatchProfile)