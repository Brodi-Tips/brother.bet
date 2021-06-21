/* eslint-disable */

export default class DashTimelines {
  static async init( $, timeline) {
    // Constants
    const tabs = [
      '#tabRankUsers',
      '#tabRankTeams',
      '#tabRankUsersHistory',
      '#tabRankTeamsHistory',
      '#tabStatistics',
    ];

    // Static Files
    await DashTimelines.initTimelines($, tabs, timeline)

    // Functions
    const timelines = $('.cd-horizontal-timeline');
    const eventsMinDistance = 60;

    timelines.length > 0 && initTimeline(timelines);

    function initTimeline(timelines) {
      timelines.each(function () {
        const timeline = $(this);
        const timelineComponents = {};
        // cache timeline components
        timelineComponents.timelineWrapper = timeline.find('.events-wrapper');
        timelineComponents.eventsWrapper = timelineComponents.timelineWrapper.children(
          '.events',
        );
        timelineComponents.fillingLine = timelineComponents.eventsWrapper.children(
          '.filling-line',
        );
        timelineComponents.timelineEvents = timelineComponents.eventsWrapper.find(
          'a',
        );
        timelineComponents.timelineDates = parseDate(
          timelineComponents.timelineEvents,
        );
        timelineComponents.eventsMinLapse = minLapse(
          timelineComponents.timelineDates,
        );
        timelineComponents.timelineNavigation = timeline.find(
          '.cd-timeline-navigation',
        );
        timelineComponents.eventsContent = timeline.children('.events-content');

        // assign a left postion to the single events along the timeline
        setDatePosition(timelineComponents, eventsMinDistance);
        // assign a width to the timeline
        const timelineTotWidth = setTimelineWidth(
          timelineComponents,
          eventsMinDistance,
        );
        // the timeline has been initialize - show it
        timeline.addClass('loaded');

        // detect click on the next arrow
        timelineComponents.timelineNavigation.on('click', '.next', (event) => {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, 'next');
        });
        // detect click on the prev arrow
        timelineComponents.timelineNavigation.on('click', '.prev', (event) => {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, 'prev');
        });
        // detect click on the a single event - show new event content
        timelineComponents['eventsWrapper'].off().on('click', 'a', function(event){
            event.preventDefault();
            timelineComponents['timelineEvents'].removeClass('selected');
            $(this).addClass('selected');
            updateOlderEvents($(this));
            updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
            updateVisibleContent($(this), timelineComponents['eventsContent']);
            $('#observer').trigger('click', [
              {
                function: 'timelineFilter',
                event,
              },
            ]);
        });

        // on swipe, show next/prev event content
        timelineComponents.eventsContent.on('swipeleft', () => {
          const mq = checkMQ();
          mq == 'mobile' &&
            showNewContent(timelineComponents, timelineTotWidth, 'next');
        });
        timelineComponents.eventsContent.on('swiperight', () => {
          const mq = checkMQ();
          mq == 'mobile' &&
            showNewContent(timelineComponents, timelineTotWidth, 'prev');
        });

        // keyboard navigation
        $(document).keyup((event) => {
          if (event.which == '37' && elementInViewport(timeline.get(0))) {
            showNewContent(timelineComponents, timelineTotWidth, 'prev');
          } else if (
            event.which == '39' &&
            elementInViewport(timeline.get(0))
          ) {
            showNewContent(timelineComponents, timelineTotWidth, 'next');
          }
        });
      });
    }

    function updateSlide(timelineComponents, timelineTotWidth, string) {
      // retrieve translateX value of timelineComponents['eventsWrapper']
      const translateValue = getTranslateValue(
        timelineComponents.eventsWrapper,
      );
      const wrapperWidth = Number(
        timelineComponents.timelineWrapper.css('width').replace('px', ''),
      );
      // translate the timeline to the left('next')/right('prev')
      string == 'next'
        ? translateTimeline(
            timelineComponents,
            translateValue - wrapperWidth + eventsMinDistance,
            wrapperWidth - timelineTotWidth,
          )
        : translateTimeline(
            timelineComponents,
            translateValue + wrapperWidth - eventsMinDistance,
          );
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
      // go from one event to the next/previous one
      const visibleContent = timelineComponents.eventsContent.find('.selected');
      const newContent =
        string == 'next' ? visibleContent.next() : visibleContent.prev();

      if (newContent.length > 0) {
        // if there's a next/prev event - show it
        const selectedDate = timelineComponents.eventsWrapper.find('.selected');
        const newEvent =
          string == 'next'
            ? selectedDate.parent('li').next('li').children('a')
            : selectedDate.parent('li').prev('li').children('a');

        updateFilling(
          newEvent,
          timelineComponents.fillingLine,
          timelineTotWidth,
        );
        updateVisibleContent(newEvent, timelineComponents.eventsContent);
        newEvent.addClass('selected');
        selectedDate.removeClass('selected');
        updateOlderEvents(newEvent);
        updateTimelinePosition(
          string,
          newEvent,
          timelineComponents,
          timelineTotWidth,
        );
      }
    }

    function updateTimelinePosition(
      string,
      event,
      timelineComponents,
      timelineTotWidth,
    ) {
      // translate timeline to the left/right according to the position of the selected event
      const eventStyle = window.getComputedStyle(event.get(0), null);
      const eventLeft = Number(
        eventStyle.getPropertyValue('left').replace('px', ''),
      );
      const timelineWidth = Number(
        timelineComponents.timelineWrapper.css('width').replace('px', ''),
      );
      var timelineTotWidth = Number(
        timelineComponents.eventsWrapper.css('width').replace('px', ''),
      );
      const timelineTranslate = getTranslateValue(
        timelineComponents.eventsWrapper,
      );

      if (
        (string == 'next' && eventLeft > timelineWidth - timelineTranslate) ||
        (string == 'prev' && eventLeft < -timelineTranslate)
      ) {
        translateTimeline(
          timelineComponents,
          -eventLeft + timelineWidth / 2,
          timelineWidth - timelineTotWidth,
        );
      }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
      const eventsWrapper = timelineComponents.eventsWrapper.get(0);
      value = value > 0 ? 0 : value;
      // only negative translate value
      value =
        !(typeof totWidth === 'undefined') && value < totWidth
          ? totWidth
          : value;
      // do not translate more than timeline width
      setTransformValue(eventsWrapper, 'translateX', `${value}px`);
      // update navigation arrows visibility
      value == 0
        ? timelineComponents.timelineNavigation
            .find('.prev')
            .addClass('inactive')
        : timelineComponents.timelineNavigation
            .find('.prev')
            .removeClass('inactive');
      value == totWidth
        ? timelineComponents.timelineNavigation
            .find('.next')
            .addClass('inactive')
        : timelineComponents.timelineNavigation
            .find('.next')
            .removeClass('inactive');
    }

    function updateFilling(selectedEvent, filling, totWidth) {
      // change .filling-line length according to the selected event
      const eventStyle = window.getComputedStyle(selectedEvent.get(0), null);
      let eventLeft = eventStyle.getPropertyValue('left');
      const eventWidth = eventStyle.getPropertyValue('width');
      eventLeft =
        Number(eventLeft.replace('px', '')) +
        Number(eventWidth.replace('px', '')) / 2;
      const scaleValue = eventLeft / totWidth;
      setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }

    function setDatePosition(timelineComponents, min) {
      for (var i = 0; i < timelineComponents.timelineDates.length; i++) {
        const distance = daydiff(
          timelineComponents.timelineDates[0],
          timelineComponents.timelineDates[i],
        );
        const distanceNorm =
          Math.round(distance / timelineComponents.eventsMinLapse) + 2;
        timelineComponents.timelineEvents
          .eq(i)
          .css('left', `${distanceNorm * min}px`);
      }
    }

    function setTimelineWidth(timelineComponents, width) {
      const timeSpan = daydiff(
        timelineComponents.timelineDates[0],
        timelineComponents.timelineDates[
          timelineComponents.timelineDates.length - 1
        ],
      );
      var timeSpanNorm = timeSpan / timelineComponents.eventsMinLapse;
      var timeSpanNorm = Math.round(timeSpanNorm) + 4;
      const totalWidth = timeSpanNorm * width;
      timelineComponents.eventsWrapper.css('width', `${totalWidth}px`);
      updateFilling(
        timelineComponents.timelineEvents.eq(0),
        timelineComponents.fillingLine,
        totalWidth,
      );

      return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
      const eventDate = event.data('date');
      const visibleContent = eventsContent.find('.selected');
      const selectedContent = eventsContent.find(`[data-date="${eventDate}"]`);
      const selectedContentHeight = selectedContent.height();

      if (selectedContent.index() > visibleContent.index()) {
        var classEnetering = 'selected enter-right';
        var classLeaving = 'leave-left';
      } else {
        var classEnetering = 'selected enter-left';
        var classLeaving = 'leave-right';
      }

      selectedContent.attr('class', classEnetering);
      visibleContent
        .attr('class', classLeaving)
        .one(
          'webkitAnimationEnd oanimationend msAnimationEnd animationend',
          () => {
            visibleContent.removeClass('leave-right leave-left');
            selectedContent.removeClass('enter-left enter-right');
          },
        );
      eventsContent.css('height', `${selectedContentHeight}px`);
    }

    function updateOlderEvents(event) {
      event
        .parent('li')
        .prevAll('li')
        .children('a')
        .addClass('older-event')
        .end()
        .end()
        .nextAll('li')
        .children('a')
        .removeClass('older-event');
    }

    function getTranslateValue(timeline) {
      const timelineStyle = window.getComputedStyle(timeline.get(0), null);
      var timelineTranslate =
        timelineStyle.getPropertyValue('-webkit-transform') ||
        timelineStyle.getPropertyValue('-moz-transform') ||
        timelineStyle.getPropertyValue('-ms-transform') ||
        timelineStyle.getPropertyValue('-o-transform') ||
        timelineStyle.getPropertyValue('transform');

      if (timelineTranslate.indexOf('(') >= 0) {
        var timelineTranslate = timelineTranslate.split('(')[1];
        timelineTranslate = timelineTranslate.split(')')[0];
        timelineTranslate = timelineTranslate.split(',');
        var translateValue = timelineTranslate[4];
      } else {
        var translateValue = 0;
      }

      return Number(translateValue);
    }

    function setTransformValue(element, property, value) {
      element.style['-webkit-transform'] = `${property}(${value})`;
      element.style['-moz-transform'] = `${property}(${value})`;
      element.style['-ms-transform'] = `${property}(${value})`;
      element.style['-o-transform'] = `${property}(${value})`;
      element.style.transform = `${property}(${value})`;
    }

    // based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
      const dateArrays = [];
      events.each(function () {
        dateArrays.push($(this).data('date'));
      });
      return dateArrays;
    }

    function daydiff(first, second) {
      return Math.round(second - first);
    }

    function minLapse(dates) {
      // determine the minimum distance among events
      const dateDistances = [];
      for (var i = 1; i < dates.length; i++) {
        const distance = daydiff(dates[i - 1], dates[i]);
        dateDistances.push(distance);
      }
      return Math.min.apply(null, dateDistances);
    }

    /*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
    function elementInViewport(el) {
      let top = el.offsetTop;
      let left = el.offsetLeft;
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset
      );
    }

    function checkMQ() {
      // check if mobile or desktop device
      return window
        .getComputedStyle(
          document.querySelector('.cd-horizontal-timeline'),
          '::before',
        )
        .getPropertyValue('content')
        .replace(/'/g, '')
        .replace(/"/g, '');
    }
  }

  static async  initTimelines($, ids,timelineHtml) {
    ids.forEach(async (id) => {
      await $(id).html(timelineHtml);
    });
  }
}
