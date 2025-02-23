import styled from 'styled-components';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListWrapper, LoadMoreItemsManuallyWrapper, StartACampaignWrapper } from '../Style/CampaignCardStyles'; // CampaignsNotAvailableToShow
import isMobileScreenSize from '../../utils/isMobileScreenSize';
import { renderLog } from '../../utils/logging';
import CampaignCardForList from './CampaignCardForList';
import LoadMoreItemsManually from '../Widgets/LoadMoreItemsManually';

// const DelayedLoad = React.lazy(() => import(/* webpackChunkName: 'DelayedLoad' */ '../Widgets/DelayedLoad'));

const STARTING_NUMBER_TO_DISPLAY = 7;
const STARTING_NUMBER_TO_DISPLAY_MOBILE = 5;
const NUMBER_TO_ADD_WHEN_MORE_CLICKED = 10;

class CampaignCardList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      campaignList: [],
      numberToDisplay: STARTING_NUMBER_TO_DISPLAY,
      showAllEndorsements: false,
      showThisYear: false,
      showUpcomingEndorsements: false,
    };
  }

  componentDidMount () {
    // console.log('CampaignCardList componentDidMount');
    const { startingNumberToDisplay } = this.props;
    if (startingNumberToDisplay && startingNumberToDisplay > 0) {
      this.setState({
        numberToDisplay: startingNumberToDisplay,
      });
    } else if (isMobileScreenSize()) {
      // We deviate from pure responsive in order to request fewer images on initial load
      this.setState({
        numberToDisplay: STARTING_NUMBER_TO_DISPLAY_MOBILE,
      });
    }
    this.onCampaignListChange();
    this.onFilterChange();
  }

  componentDidUpdate (prevProps) { // prevProps, prevState, snapshot
    const { listModeFiltersTimeStampOfChange, timeStampOfChange, shouldLoadMore } = this.props;
    if (listModeFiltersTimeStampOfChange && listModeFiltersTimeStampOfChange !== prevProps.listModeFiltersTimeStampOfChange) {
      this.onFilterChange();
    }
    if (timeStampOfChange && timeStampOfChange !== prevProps.timeStampOfChange) {
      this.onCampaignListChange();
    }
    if (shouldLoadMore && shouldLoadMore !== prevProps.shouldLoadMore) {
      // console.log(shouldLoadMore);
      this.loadMoreHasBeenClicked();
    }
  }

  onCampaignListChange () {
    const { incomingCampaignList } = this.props;
    if (incomingCampaignList) {
      this.setState({
        campaignList: incomingCampaignList,
      });
    } else {
      this.setState({
        campaignList: [],
      });
    }
  }

  onFilterChange = () => {
    // console.log('onFilterOrListChange');
    const { listModeFilters } = this.props;
    const today = new Date();
    const thisYearInteger = today.getFullYear();
    let showAllEndorsements = false;
    let showThisYear = false;
    let showUpcomingEndorsements = false;
    if (listModeFilters && listModeFilters.length > 0) {
      listModeFilters.forEach((oneFilter) => {
        // console.log('oneFilter:', oneFilter);
        if ((oneFilter.filterType === 'showAllEndorsements') && (oneFilter.filterSelected === true)) {
          showAllEndorsements = true;
        }
        if ((oneFilter.filterYear === thisYearInteger) && (oneFilter.filterSelected === true)) {
          showThisYear = true;
        }
        if ((oneFilter.filterType === 'showUpcomingEndorsements') && (oneFilter.filterSelected === true)) {
          showUpcomingEndorsements = true;
        }
      });
    }
    this.setState({
      showAllEndorsements,
      showThisYear,
      showUpcomingEndorsements,
    });
  }

  increaseNumberToDisplay = () => {
    let { numberToDisplay } = this.state;
    numberToDisplay += NUMBER_TO_ADD_WHEN_MORE_CLICKED;
    this.setState({
      numberToDisplay,
    });
  }

  loadMoreHasBeenClicked = () => {
    this.increaseNumberToDisplay();
    // console.log('load more has been clicked');
    if (this.props.loadMoreScroll) {
      // console.log('loadMoreScroll exists');
      this.props.loadMoreScroll();
    }
  }

  render () {
    renderLog('CampaignCardList');  // Set LOG_RENDER_EVENTS to log all renders
    // console.log('CampaignCardList render');
    const { searchText, useVerticalCard } = this.props;
    const { campaignList, numberToDisplay, showAllEndorsements, showThisYear, showUpcomingEndorsements } = this.state;

    if (!campaignList) {
      return null;
    }
    let numberDisplayed = 0;
    return (
      <Wrapper>
        <ListWrapper useVerticalCard={useVerticalCard}>
          {campaignList.map((oneCampaign) => {
            if (numberDisplayed >= numberToDisplay) {
              return null;
            }
            numberDisplayed += 1;
            return (
              <div key={`oneCampaignItem-${oneCampaign.campaignx_we_vote_id}`}>
                <CampaignCardForList
                  campaignXWeVoteId={oneCampaign.campaignx_we_vote_id}
                  limitCardWidth={useVerticalCard}
                  useVerticalCard={useVerticalCard}
                />
              </div>
            );
          })}
          {!!(numberDisplayed && (searchText || showAllEndorsements || showThisYear || showUpcomingEndorsements)) && (
            <StartACampaignWrapper>
              <Link className="u-link-color" to="/start-a-campaign">
                Start a campaign
                {(searchText && searchText.length > 0) && (
                  <>
                    {' '}
                    related to
                    {' '}
                    &quot;
                    {searchText}
                    &quot;
                  </>
                )}
              </Link>
            </StartACampaignWrapper>
          )}
          {!!(campaignList &&
              campaignList.length > 1 &&
              numberToDisplay < campaignList.length) &&
          (
            <LoadMoreItemsManuallyWrapper>
              <LoadMoreItemsManually
                loadMoreFunction={this.loadMoreHasBeenClicked}
                uniqueExternalId="CampaignCardList"
              />
            </LoadMoreItemsManuallyWrapper>
          )}
        </ListWrapper>
        {/* Commented out section was moved below to stop breaking the cordova conversion - move it back if actually needed */}
      </Wrapper>
    );
  }
}
/*      August 9, 2023:  The word "SusDISABLEDpense" without the "DISABLED" breaks the buildSrcCordova.js, which can't handle that word in a comment
        <SusDISABLEDpense fallback={<></>}>
          <DelayedLoad loadingTextLeftAlign showLoadingText waitBeforeShow={2000}>
            <div>
              {!(numberDisplayed) && (
                <CampaignsNotAvailableToShow>
                  No campaigns match.
                  {!!(searchText || showAllEndorsements || showThisYear || showUpcomingEndorsements) && (
                    <>
                      {' '}
                      <Link className="u-link-color" to="/start-a-campaign">
                        Start a campaign
                        {(searchText && searchText.length > 0) && (
                          <>
                            {' '}
                            related to
                            {' '}
                            &quot;
                            {searchText}
                            &quot;
                          </>
                        )}
                      </Link>
                      .
                    </>
                  )}
                </CampaignsNotAvailableToShow>
              )}
            </div>
          </DelayedLoad>
        </SusDISABLEDpense>
*/

CampaignCardList.propTypes = {
  incomingCampaignList: PropTypes.array,
  listModeFilters: PropTypes.array,
  listModeFiltersTimeStampOfChange: PropTypes.number,
  searchText: PropTypes.string,
  startingNumberToDisplay: PropTypes.number,
  timeStampOfChange: PropTypes.number,
  useVerticalCard: PropTypes.bool,
  loadMoreScroll: PropTypes.func,
  shouldLoadMore: PropTypes.bool,
};

const styles = () => ({
  iconButton: {
    padding: 8,
  },
});

const Wrapper = styled('div')`
  min-height: 30px;
`;

export default withStyles(styles)(CampaignCardList);
