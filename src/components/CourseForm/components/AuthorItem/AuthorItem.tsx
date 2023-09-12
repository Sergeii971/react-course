import { AuthorItemProp } from './AuthorItem.types';
import { Button } from 'src/common/Button';

import './AuthorItem.css';

const REMOVE_BUTTON_TEXT = '-';
const ADD_BUTTON_TEXT = '+';

export const AuthorItem: React.FC<AuthorItemProp> = ({
	author,
	onClickRemove,
	onClickAdd,
	isCourseAuthor,
}) => {
	if (isCourseAuthor) {
		return (
			<div className='courseAuthorItem'>
				<text>{author.name}</text>

				<div className='removeAuthorButton'>
					<Button text={REMOVE_BUTTON_TEXT} onClick={onClickRemove} />
				</div>
			</div>
		);
	}

	return (
		<div className='courseAuthorItem'>
			<text>{author.name}</text>
			<div className='addAuthorButton'>
				<Button text={ADD_BUTTON_TEXT} onClick={onClickAdd} />
			</div>
			<div className='removeAuthorButton'>
				<Button text={REMOVE_BUTTON_TEXT} onClick={onClickRemove} />
			</div>
		</div>
	);
};
