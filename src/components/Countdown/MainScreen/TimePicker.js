/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {WheelPicker} from 'react-native-wheel-picker-android';
import * as wheelState from './wheelState';
import {useSelector, useDispatch} from 'react-redux';

function TimeWheel(props) {
	const {select, data, onSelect} = props;
	return (
		<WheelPicker
			style={{width: 60}}
			isCyclic={true}
			selectedItemTextColor="#ff7800"
			selectedItemTextSize={24}
			itemTextColor="gray"
			itemTextSize={16}
			selectedItem={select}
			data={data}
			onItemSelected={onSelect}
		/>
	);
}

export default function TimePicker() {
	const selectedHours = useSelector(state => state.timeReducer.selectedHours);
	const selectedMinutes = useSelector(
		state => state.timeReducer.selectedMinutes,
	);
	const selectedSeconds = useSelector(
		state => state.timeReducer.selectedSeconds,
	);
	const edit = useSelector(state => state.editReducer.edit);
	const selectedItem = useSelector(
		state => state.selectedItemReducer.selectedItem,
	);
	const press = useSelector(state => state.pressReducer.press);
	const dispatch = useDispatch();
	useEffect(() => {
		if (selectedHours === 0 && selectedMinutes === 0 && selectedSeconds === 0) {
			dispatch({type: 'SECONDS', value: 1});
		}
	}, [dispatch, selectedHours, selectedMinutes, selectedSeconds]);
	function onSelectHours(value) {
		if (
			selectedItem !== undefined &&
			value !== Math.floor(selectedItem.time / 3600)
		) {
			if (press) {
				dispatch({type: 'CLEAR_SELECT_ITEM'});
			}
		}
		dispatch({type: 'HOURS', value});
	}
	function onSelectMinutes(value) {
		if (
			selectedItem !== undefined &&
			value !==
				(selectedItem.time -
					3600 * Math.floor(selectedItem.time / 3600) -
					(selectedItem.time % 60)) /
					60
		) {
			if (press) {
				dispatch({type: 'CLEAR_SELECT_ITEM'});
			}
		}
		dispatch({type: 'MINUTES', value});
	}
	function onSelectSeconds(value) {
		if (selectedItem !== undefined && value !== selectedItem.time % 60) {
			if (press) {
				dispatch({type: 'CLEAR_SELECT_ITEM'});
			}
		}
		dispatch({type: 'SECONDS', value});
	}
	return (
		<View style={[styles.timePicker, {opacity: edit ? 0.2 : 1}]}>
			<View
				style={{
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					position: 'absolute',
					zIndex: edit ? 1 : -1,
				}}
			/>
			<TimeWheel
				select={selectedHours}
				data={wheelState.hours}
				onSelect={item => onSelectHours(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textHours}
			/>
			<TimeWheel
				select={selectedMinutes}
				data={wheelState.minutes}
				onSelect={item => onSelectMinutes(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textMinutes}
			/>
			<TimeWheel
				select={selectedSeconds}
				data={wheelState.seconds}
				onSelect={item => onSelectSeconds(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textSeconds}
			/>
		</View>
	);
}
