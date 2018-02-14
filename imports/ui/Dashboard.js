import React from 'react';

import PrivateHeader from './PrivateHeader';
import QuestionList from './QuestionList'

export default () => {
	return (
		<div>
			<PrivateHeader title="Dashboard"/>
			<div className="page-content" >
				<QuestionList/>
			</div>
		</div>
	);
};
