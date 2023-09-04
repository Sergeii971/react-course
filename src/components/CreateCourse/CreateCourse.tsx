import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'src/common/Button';
import { Input } from 'src/common/Input';
import { Author } from '../Courses/components/CourseCard/Author.types';
import { AuthorItem } from './components/AuthorItem';
import { Course } from 'src/course.type';
import {
	isAuthorNameValid,
	isCourseAuthorListValid,
	isCourseDescriptionValid,
	isCourseDurationValid,
	isCourseTitleValid,
	isNewCourseValid,
} from 'src/util/validator/CourseValidator';
import { getCourseDuration } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import { TOKEN_KEY_NAME } from 'src/util/CommonConstant';
import { AddCourseAction } from 'src/store/course/action';
import { RootState } from 'src/store';
import { AddAuthorAction } from 'src/store/author/action';

import './AddCourse.css';

const PAGE_TITLE = 'Course Edit/Create Page';
const titleErrorLabelMessage = 'length should be at least 2 characters';
const descriptionErrorLabelMessage =
	'text length should be at least 2 characters';
const durationErrorLabelMessage = 'duration should be more than 0';
const authorNameErrorLabelMessage = 'length should be at least 2 characters';
const courseAuthorListErrorLabelMessage = 'Add authors to this list';
const AUTHOR_LIST_IS_EMPTY_MESSAGE = 'Author list is Empty';

const COURSE_FORM_TITLE = 'Main Info';

const TITLE_NAME_VALUE = 'title';
const TITLE_LABEL_TEXT = 'Title*';
const INPUT_TITLE_PLACEHOLDER_TEXT = 'Input title';

const DESCRIPTION_NAME_VALUE = 'description';
const DESCRIPTION_LABEL_TEXT = 'Description*';
const INPUT_DESCRIPTION_PLACEHOLDER_TEXT = 'Input description';

const DURATION_PART_TITLE = 'Duration';
const DURATION_NAME_VALUE = 'duration';
const DURATION_LABEL_TEXT = 'Duration*';
const INPUT_DURATION_PLACEHOLDER_TEXT = 'Input duration';

const AUTHORS_PART_TITLE = 'Authors';
const AUTHOR_NAME_VALUE = 'authorName';
const AUTHORS_LABEL_TEXT = 'Author Name';
const INPUT_AUTHORS_PLACEHOLDER_TEXT = 'Input author name';

const CREATE_AUTHOR_BUTTON_TEXT = 'CREATE AUTHOR';

const COURSE_AUTHOR_LIST_TITLE = 'Course Authors*';

const CANCEL_BUTTON_TEXT = 'CANCEL';
const ADD_COURSE_BUTTON_TEXT = 'ADD COURSE';

export const CreateCourse: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if (
		localStorage.getItem(TOKEN_KEY_NAME) === '' ||
		localStorage.getItem(TOKEN_KEY_NAME) === null
	) {
		navigate(RouterPath.LOGIN);
	}
	const [title, setTitle] = useState('');
	const [titleErrorLabelValue, setTitleErrorLabelValue] = useState('');
	const [description, setDescription] = useState('');
	const [descriptionErrorLabelValue, setDescriptionErrorLabelValue] =
		useState('');
	const [duration, setDuration] = useState('');
	const [durationErrorLabelValue, setDurationErrorLabelValue] = useState('');
	const [time, setTime] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [authorNameErrorLabelValue, setAuthorNameErrorLabelValue] =
		useState('');
	const [authorList, setAuthorList] = useState([]);
	const [courseAuthorList, setCourseAuthorList] = useState([]);
	const [courseAuthorListErrorLabelValue, setCourseAuthorListErrorLabelValue] =
		useState('');

	const authors = useSelector(
		(state: RootState) => state.authorReducer.authors
	);

	useEffect(() => {
		setAuthorList(authors);
	}, authors);

	const titleOnChange = (event) => {
		const newTitle = event.target.value;
		setTitleErrorLabelValue(
			isCourseTitleValid(newTitle) ? '' : titleErrorLabelMessage
		);

		setTitle(newTitle);
	};

	const descriptionOnChange = (event) => {
		const newDescription = event.target.value;
		setDescriptionErrorLabelValue(
			isCourseDescriptionValid(newDescription)
				? ''
				: descriptionErrorLabelMessage
		);
		setDescription(newDescription);
	};

	const durationOnChange = (event) => {
		const newDuration: number = event.target.value;
		if (isCourseDurationValid(newDuration)) {
			setTitleErrorLabelValue('');
			const time: string = getCourseDuration(newDuration);
			setTime(time);
			setDurationErrorLabelValue('');
		} else {
			setDurationErrorLabelValue(durationErrorLabelMessage);
		}
		setDuration(String(newDuration));
	};

	const authorNameOnChange = (event) => {
		const newAuthorName = event.target.value;
		setAuthorNameErrorLabelValue(
			isAuthorNameValid(newAuthorName) ? '' : authorNameErrorLabelMessage
		);
		setAuthorName(newAuthorName);
	};

	const createAuthor = () => {
		if (isAuthorNameValid(authorName)) {
			const newArray = authorList.map((item) => {
				return item;
			});
			const newAuthor: Author = {
				id: uuidv4(),
				name: authorName,
			};
			newArray.push(newAuthor);

			setAuthorList(newArray);
			setAuthorName('');
		} else {
			setAuthorNameErrorLabelValue(authorNameErrorLabelMessage);
		}
	};

	const addCourseAuthor = (authorId: string) => {
		const replacingAuthor: Author = authorList.find((item: Author) => {
			return item.id === authorId;
		});
		const newAuthorArray = authorList.filter((item: Author) => {
			return item.id !== authorId;
		});
		const newCourseAuthorArray = courseAuthorList.map((item) => {
			return item;
		});
		newCourseAuthorArray.push(replacingAuthor);
		setAuthorList(newAuthorArray);
		setCourseAuthorList(newCourseAuthorArray);
		setCourseAuthorListErrorLabelValue(
			isCourseAuthorListValid(newCourseAuthorArray)
				? ''
				: courseAuthorListErrorLabelMessage
		);
	};

	const removeCourseAuthor = (authorId: string) => {
		const replacingAuthor: Author = courseAuthorList.find((item: Author) => {
			return item.id === authorId;
		});
		const newCourseAuthorArray = courseAuthorList.filter((item: Author) => {
			return item.id !== authorId;
		});
		const newAuthorArray = authorList.map((item) => {
			return item;
		});
		newAuthorArray.push(replacingAuthor);
		setAuthorList(newAuthorArray);
		setCourseAuthorList(newCourseAuthorArray);
	};

	const removeAuthor = (authorId: string) => {
		const newAuthorArray = authorList.filter((item: Author) => {
			return item.id !== authorId;
		});
		setAuthorList(newAuthorArray);
	};

	const createCourse = () => {
		const newCourse: Course = {
			id: uuidv4(),
			title: title,
			description: description,
			creationDate: new Date().toUTCString(),
			duration: Number(duration),
			authors: courseAuthorList.map((courseAuthor: Author) => courseAuthor.id),
		};

		if (isNewCourseValid(newCourse)) {
			const newAuthorList = [];
			courseAuthorList
				.filter((courseAuthor) => !authors.includes(courseAuthor))
				.forEach((author) => {
					newAuthorList.push(author);
				});

			authorList
				.filter((author) => !authors.includes(author))
				.forEach((author) => newAuthorList.push(author));

			newAuthorList.forEach((author) => dispatch(AddAuthorAction(author)));

			dispatch(AddCourseAction(newCourse));

			navigate(RouterPath.GET_COURSES);
		} else {
			if (!isCourseTitleValid(newCourse.title)) {
				setTitleErrorLabelValue(titleErrorLabelMessage);
			}
			if (!isCourseDescriptionValid(newCourse.description)) {
				setDescriptionErrorLabelValue(descriptionErrorLabelMessage);
			}
			if (!isCourseDurationValid(newCourse.duration)) {
				setDurationErrorLabelValue(durationErrorLabelMessage);
			}
			if (!isCourseAuthorListValid(courseAuthorList)) {
				setCourseAuthorListErrorLabelValue(courseAuthorListErrorLabelMessage);
			}
		}
	};

	return (
		<div>
			<div className='addCourse'>
				<div className='addCourseTitle'>
					<h1>{PAGE_TITLE}</h1>
				</div>
				<div className='addCourseForm'>
					<form>
						<div className='addCourseFormTitle'>
							<h3>{COURSE_FORM_TITLE}</h3>
						</div>
						<div className='courseTitle'>
							<Input
								type={'text'}
								name={TITLE_NAME_VALUE}
								value={title}
								required={true}
								labelText={TITLE_LABEL_TEXT}
								placeholderText={INPUT_TITLE_PLACEHOLDER_TEXT}
								onChange={titleOnChange}
							/>
							<label className='errorLabel'>{titleErrorLabelValue}</label>
						</div>
						<div className='courseDescription'>
							<Input
								type={'textArea'}
								name={DESCRIPTION_NAME_VALUE}
								value={description}
								required={true}
								labelText={DESCRIPTION_LABEL_TEXT}
								placeholderText={INPUT_DESCRIPTION_PLACEHOLDER_TEXT}
								onChange={descriptionOnChange}
							/>
							<label className='errorLabel'>{descriptionErrorLabelValue}</label>
						</div>
						<div className='durationTitle'>
							<h3>{DURATION_PART_TITLE}</h3>
						</div>
						<div className='duration'>
							<Input
								type={'number'}
								name={DURATION_NAME_VALUE}
								value={duration}
								required={true}
								labelText={DURATION_LABEL_TEXT}
								placeholderText={INPUT_DURATION_PLACEHOLDER_TEXT}
								onChange={durationOnChange}
							/>
							<div className='durationTimeFormat'>
								<text>{time}</text>
							</div>
						</div>
						<label className='errorLabel'>{durationErrorLabelValue}</label>
					</form>
					<div className='authorsModule'>
						<div className='author'>
							<div className='authorTitle'>
								<h3>{AUTHORS_PART_TITLE}</h3>
							</div>
							<div className='inputWithButton'>
								<Input
									type={'text'}
									name={AUTHOR_NAME_VALUE}
									value={authorName}
									required={true}
									labelText={AUTHORS_LABEL_TEXT}
									placeholderText={INPUT_AUTHORS_PLACEHOLDER_TEXT}
									onChange={authorNameOnChange}
								/>
								<div className='createCourseButton'>
									<Button
										text={CREATE_AUTHOR_BUTTON_TEXT}
										onClick={createAuthor}
									/>
								</div>
							</div>
							<label className='errorLabel'>{authorNameErrorLabelValue}</label>
							<div className='authorForm'>
								<div className='courseAuthorTitle'>
									<h3>Authors List</h3>
								</div>
								<div className='authorList'>
									{authorList.length > 0
										? authorList.map((author) => (
												<AuthorItem
													author={author}
													onClickRemove={() => removeAuthor(author.id)}
													onClickAdd={() => addCourseAuthor(author.id)}
													isCourseAuthor={false}
												/>
										  ))
										: AUTHOR_LIST_IS_EMPTY_MESSAGE}
								</div>
							</div>
						</div>
						<div className='courseAuthorForm'>
							<div className='courseAuthorTitle'>
								<h3>{COURSE_AUTHOR_LIST_TITLE}</h3>
							</div>
							<div className='courseAuthorList'>
								{courseAuthorList.length > 0
									? courseAuthorList.map((author) => (
											<AuthorItem
												author={author}
												onClickRemove={() => removeCourseAuthor(author.id)}
												onClickAdd={() => addCourseAuthor(author.id)}
												isCourseAuthor={true}
											/>
									  ))
									: AUTHOR_LIST_IS_EMPTY_MESSAGE}
							</div>
							<label className='errorLabel'>
								{courseAuthorListErrorLabelValue}
							</label>
						</div>
					</div>
				</div>
				<div className='mainButtons'>
					<div className='button'>
						<Button
							text={CANCEL_BUTTON_TEXT}
							onClick={() => navigate(RouterPath.GET_COURSES)}
						/>
					</div>
					<div className='button'>
						<Button
							text={ADD_COURSE_BUTTON_TEXT}
							onClick={() => createCourse()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
