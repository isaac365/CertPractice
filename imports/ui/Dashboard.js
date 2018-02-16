import React from 'react';

import PrivateHeader from './PrivateHeader';
import QuestionList from './QuestionList';
import Editor from './Editor';

export default () => {
	return (
		<div>
			<PrivateHeader title="Dashboard"/>
			<div className="page-content" >
				<QuestionList/>
				<Editor/>
			</div>
		</div>
	);
};
