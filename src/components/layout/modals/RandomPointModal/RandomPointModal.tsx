import 'rc-slider/assets/index.css';

import Switch from 'react-switch';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IRouteGenerationParams } from '../../../../utils/MapUtils.d';
import { generateRouteFunction, routeGenerationParamsState } from '../../../../utils/State';
import variables from '../../../../variables';
import {
	ModalBody,
	ModalContentWrapper,
	ModalHeader,
	ModalHeaderButton,
	ModalHeaderConfirmButton,
	ModalInputLabelGroup,
	ModalInputLabelMain,
	ModalInputLabelSecondary,
	ModalInputRow,
} from '../Styles.ModalBase';
import CompassSlider from './CompassSlider/CompassSlider';
import {
	CustomSilder,
	CustomSliderLabelsWrapper,
	CustomSliderWrapper,
	RandomPointModeSelector,
} from './Styles.RandomPointModal';

const timeSelectionModeIcon = (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10 3H14M12 9V13L14 15M20 13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13C4 8.58172 7.58172 5 12 5C16.4183 5 20 8.58172 20 13Z"
			stroke="#000000"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const distanceSelectionModeIcon = (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M14.78 20H9.78C7.98 20 4.58 19.09 4.58 15.64C4.58 12.19 7.98 11.28 9.78 11.28H14.22C14.37 11.28 17.92 11.23 17.92 8.42C17.92 5.61 14.37 5.56 14.22 5.56H9.22C9.02109 5.56 8.83032 5.48098 8.68967 5.34033C8.54902 5.19968 8.47 5.00891 8.47 4.81C8.47 4.61109 8.54902 4.42032 8.68967 4.27967C8.83032 4.13902 9.02109 4.06 9.22 4.06H14.22C16.02 4.06 19.42 4.97 19.42 8.42C19.42 11.87 16.02 12.78 14.22 12.78H9.78C9.63 12.78 6.08 12.83 6.08 15.64C6.08 18.45 9.63 18.5 9.78 18.5H14.78C14.9789 18.5 15.1697 18.579 15.3103 18.7197C15.451 18.8603 15.53 19.0511 15.53 19.25C15.53 19.4489 15.451 19.6397 15.3103 19.7803C15.1697 19.921 14.9789 20 14.78 20Z"
			fill="#000000"
		/>
		<path
			d="M6.44 8.31C5.74314 8.30407 5.06363 8.09202 4.48708 7.70056C3.91054 7.30909 3.46276 6.75573 3.20018 6.11021C2.93759 5.46469 2.87195 4.75589 3.01153 4.07312C3.1511 3.39036 3.48965 2.76418 3.9845 2.2735C4.47935 1.78281 5.10837 1.44958 5.79229 1.31579C6.47622 1.182 7.18444 1.25363 7.82771 1.52167C8.47099 1.78971 9.02054 2.24215 9.40711 2.82199C9.79368 3.40182 9.99998 4.08311 10 4.78C10 5.2461 9.90773 5.70759 9.72846 6.13783C9.54919 6.56808 9.28648 6.95856 8.95551 7.28675C8.62453 7.61494 8.23184 7.87433 7.80009 8.04995C7.36834 8.22558 6.90609 8.31396 6.44 8.31ZM6.44 2.75C6.04444 2.75 5.65776 2.86729 5.32886 3.08706C4.99996 3.30682 4.74362 3.61918 4.59224 3.98463C4.44087 4.35008 4.40126 4.75221 4.47843 5.14018C4.5556 5.52814 4.74609 5.8845 5.02579 6.16421C5.3055 6.44391 5.66186 6.6344 6.04982 6.71157C6.43779 6.78874 6.83992 6.74913 7.20537 6.59776C7.57082 6.44638 7.88318 6.19003 8.10294 5.86114C8.32271 5.53224 8.44 5.14556 8.44 4.75C8.44 4.48735 8.38827 4.22728 8.28776 3.98463C8.18725 3.74198 8.03993 3.5215 7.85422 3.33578C7.6685 3.15007 7.44802 3.00275 7.20537 2.90224C6.96272 2.80173 6.70265 2.75 6.44 2.75Z"
			fill="#000000"
		/>
		<path
			d="M17.56 22.75C16.8614 22.752 16.1779 22.5466 15.5961 22.1599C15.0143 21.7733 14.5603 21.2227 14.2916 20.5778C14.0229 19.933 13.9515 19.2229 14.0866 18.5375C14.2217 17.8521 14.5571 17.2221 15.0504 16.7275C15.5437 16.2328 16.1726 15.8956 16.8577 15.7586C17.5427 15.6215 18.253 15.6909 18.8986 15.9577C19.5442 16.2246 20.0961 16.6771 20.4844 17.2578C20.8727 17.8385 21.08 18.5214 21.08 19.22C21.08 20.1545 20.7095 21.0508 20.0496 21.7125C19.3898 22.3743 18.4945 22.7473 17.56 22.75ZM17.56 17.19C17.1644 17.19 16.7778 17.3073 16.4489 17.5271C16.12 17.7468 15.8636 18.0592 15.7122 18.4246C15.5609 18.7901 15.5213 19.1922 15.5984 19.5802C15.6756 19.9681 15.8661 20.3245 16.1458 20.6042C16.4255 20.8839 16.7819 21.0744 17.1698 21.1516C17.5578 21.2287 17.9599 21.1891 18.3254 21.0377C18.6908 20.8864 19.0032 20.63 19.2229 20.3011C19.4427 19.9722 19.56 19.5856 19.56 19.19C19.56 18.6596 19.3493 18.1508 18.9742 17.7758C18.5991 17.4007 18.0904 17.19 17.56 17.19Z"
			fill="#000000"
		/>
	</svg>
);

const RandomPointModal = (props: { closingFunction: () => void }) => {
	const DISTANCE_LIMITS = [0, 50];
	const TIME_LIMITS = [1, 100];
	const DIRECTION_LIMITS = [0, 359];

	const [routeGenerationParams, setRouteGenerationParams] =
		useRecoilState<IRouteGenerationParams>(routeGenerationParamsState);

	const generateRoute = useRecoilValue(generateRouteFunction);

	const handleGeneration = () => {
		generateRoute();
		props.closingFunction();
	};

	const updateGenerationParam = (key: keyof IRouteGenerationParams, value: any) => {
		setRouteGenerationParams((old) => {
			return { ...old, [key]: value };
		});
	};

	return (
		<ModalContentWrapper>
			<ModalHeader>
				<ModalHeaderButton onClick={props.closingFunction}>&lt; Back</ModalHeaderButton>

				<ModalHeaderConfirmButton onClick={handleGeneration}>
					Generate &gt;
				</ModalHeaderConfirmButton>
			</ModalHeader>
			<ModalBody>
				<h1 style={{ textAlign: 'center' }}>Mode</h1>
				<label>
					<RandomPointModeSelector>
						<span className="first flex-item">{timeSelectionModeIcon} Time</span>
						<Switch
							className="switch"
							width={64}
							handleDiameter={32}
							onChange={(checked) =>
								updateGenerationParam(
									'routeGenerationMode',
									checked ? 'distance' : 'time'
								)
							}
							checked={routeGenerationParams.routeGenerationMode === 'distance'}
							offColor={variables.menuBackgroundColorDarker}
							offHandleColor={variables.primaryColor}
							onColor={variables.menuBackgroundColorDarker}
							onHandleColor={variables.primaryColor}
							checkedIcon={false}
							uncheckedIcon={false}
						/>
						<span className="last flex-item">Distance {distanceSelectionModeIcon}</span>
					</RandomPointModeSelector>
				</label>
				<ModalInputRow>
					<ModalInputLabelGroup
						className={
							routeGenerationParams.routeGenerationMode === 'time' ? 'disabled' : ''
						}
					>
						<ModalInputLabelMain>Distance</ModalInputLabelMain>
						<ModalInputLabelSecondary>Kilometers</ModalInputLabelSecondary>
					</ModalInputLabelGroup>
					<CustomSliderWrapper style={{ width: '100%' }}>
						<CustomSilder
							disabled={routeGenerationParams.routeGenerationMode === 'time'}
							range
							allowCross={false}
							defaultValue={routeGenerationParams.distanceValues}
							min={DISTANCE_LIMITS[0]}
							max={DISTANCE_LIMITS[1]}
							onChange={(values) =>
								updateGenerationParam('distanceValues', values as number[])
							}
						/>
						<CustomSliderLabelsWrapper>
							<span
								style={{
									textAlign: 'center',
									marginLeft: `${
										routeGenerationParams.distanceValues[0] *
										(100 / DISTANCE_LIMITS[1])
									}%`,
									marginTop: '5%',
									position: 'absolute',
									left: -8,
								}}
							>
								{routeGenerationParams.distanceValues[0]}
							</span>
							<span
								style={{
									marginRight: `${
										100 -
										routeGenerationParams.distanceValues[1] *
											(100 / DISTANCE_LIMITS[1])
									}%`,
									position: 'absolute',
									right: -7,
								}}
							>
								{routeGenerationParams.distanceValues[1]}
							</span>
						</CustomSliderLabelsWrapper>
					</CustomSliderWrapper>
				</ModalInputRow>
				<ModalInputRow>
					<ModalInputLabelGroup
						className={
							routeGenerationParams.routeGenerationMode === 'distance'
								? 'disabled'
								: ''
						}
					>
						<ModalInputLabelMain>Time</ModalInputLabelMain>
						<ModalInputLabelSecondary>Minutes</ModalInputLabelSecondary>
					</ModalInputLabelGroup>
					<CustomSliderWrapper style={{ width: '100%' }}>
						<CustomSilder
							disabled={routeGenerationParams.routeGenerationMode === 'distance'}
							range
							min={TIME_LIMITS[0]}
							max={TIME_LIMITS[1]}
							allowCross={false}
							defaultValue={routeGenerationParams.timeValues}
							onChange={(values) =>
								updateGenerationParam('timeValues', values as number[])
							}
						/>
						<CustomSliderLabelsWrapper>
							<span
								style={{
									textAlign: 'left',
									marginTop: '5%',
									position: 'absolute',
									left: -8,
									right: -7,

									marginLeft: `${
										routeGenerationParams.timeValues[0] * (100 / TIME_LIMITS[1])
									}%`,
								}}
							>
								{routeGenerationParams.timeValues[0]}
							</span>
							<span
								style={{
									textAlign: 'left',
									position: 'absolute',
									right: -7,
									marginRight: `${
										100 -
										routeGenerationParams.timeValues[1] * (100 / TIME_LIMITS[1])
									}%`,
								}}
							>
								{routeGenerationParams.timeValues[1]}
							</span>
						</CustomSliderLabelsWrapper>
					</CustomSliderWrapper>
				</ModalInputRow>
				<ModalInputRow>
					<ModalInputLabelGroup>
						<ModalInputLabelMain>Direction</ModalInputLabelMain>
						<ModalInputLabelSecondary>Degrees</ModalInputLabelSecondary>
					</ModalInputLabelGroup>
					<CompassSlider
						toggleFlipped={() =>
							updateGenerationParam(
								'directionFlipped',
								!routeGenerationParams.directionFlipped
							)
						}
						flipped={routeGenerationParams.directionFlipped}
						limits={DIRECTION_LIMITS}
						values={routeGenerationParams.headingValues}
						onChange={(numbers) => updateGenerationParam('headingValues', numbers)}
					/>
				</ModalInputRow>
				<ModalInputRow style={{ justifyContent: 'end', marginTop: '10%' }}>
					<ModalInputLabelGroup>
						<ModalInputLabelSecondary>Keep Generating</ModalInputLabelSecondary>
					</ModalInputLabelGroup>
					<Switch
						onChange={() =>
							updateGenerationParam(
								'keepGenerating',
								!routeGenerationParams.keepGenerating
							)
						}
						checked={routeGenerationParams.keepGenerating}
						className="switch"
						width={64}
						handleDiameter={32}
						offColor={variables.menuBackgroundColorDarker}
						offHandleColor={variables.primaryColor}
						onColor={variables.primaryColor}
						onHandleColor={variables.menuBackgroundColorDarker}
					/>
				</ModalInputRow>
			</ModalBody>
		</ModalContentWrapper>
	);
};

export default RandomPointModal;
