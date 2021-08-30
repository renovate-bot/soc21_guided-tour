Joomla = window.Joomla || {};
(function(Joomla, window) {
    document.addEventListener('DOMContentLoaded', function() {
        // sessionStorage.setItem("tourid", 0);
        var myTours = Joomla.getOptions('myTours');
        var mySteps = Joomla.getOptions('mySteps');
        var obj = JSON.parse(myTours);
        var objSteps = JSON.parse(mySteps);
        // console.log(objSteps[2].multipage);


        let btnGoods = document.querySelectorAll('.button-tour');
        for (var i = 0; i < btnGoods.length; i++) {
            btnGoods[i].addEventListener('click', function() {
                var dataID = this.getAttribute('data-id');
                var mainID = obj.findIndex(x => x.id === dataID);
                sessionStorage.setItem("tourid", mainID);

                var currentURL = window.location.href;

                if (currentURL != obj[mainID].url) {
                    window.location.href = obj[mainID].url;
                }
                const tour = new Shepherd.Tour({
                    defaultStepOptions: {
                        cancelIcon: {
                            enabled: true
                        },
                        classes: 'class-1 class-2 shepherd-theme-arrows',
                        scrollTo: { behavior: 'smooth', block: 'center' }
                    },
                    useModalOverlay: true,
                    keyboardNavigation: true,
                });

                if (sessionStorage.getItem('tourid')) {
                    var len = obj[mainID].steps.length;
                    tour.addStep({
                        title: obj[mainID].title,
                        text: obj[mainID].description,
                        classes: 'intro-step shepherd-theme-arrows',
                        attachTo: {
                            on: 'bottom'
                        },
                        buttons: [{
                                action() {
                                    return this.back();
                                },
                                classes: 'shepherd-button-secondary shepherd-theme-arrows',
                                text: 'Back'
                            },
                            {
                                action() {
                                    return this.next();
                                },
                                text: 'Next'
                            },
                            {
                                action() {
                                    return this.complete();
                                },
                                text: 'Complete'
                            }
                        ],
                        id: obj[mainID].id,
                    });
                }
                console.log("ha chal raha hai thik se");
                tour.start();
            });
        }
        var mainID = sessionStorage.getItem('tourid');
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                cancelIcon: {
                    enabled: true
                },
                classes: 'class-1 class-2 shepherd-theme-arrows',
                scrollTo: { behavior: 'smooth', block: 'center' }
            },
            useModalOverlay: true,
            keyboardNavigation: true,
            popperOptions: {
                modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
            }
        });


        // var newIndex = objSteps.findIndex(x => x.multipage == '1')
        // console.log(newIndex);
        var currentURL = window.location.href;
        if (mainID) {
            for (index = 0; index < obj[mainID].steps.length; index++) {
                // if (currentURL == obj[mainID].steps[index].url) {

                // var newInt = parseInt(objSteps[index].id);
                // if (objSteps[index].multipage == '1') {
                //     sessionStorage.setItem('stepID', objSteps[index].multipage);
                // }
                tour.addStep({
                    title: obj[mainID].steps[index].title,
                    text: obj[mainID].steps[index].description,
                    classes: 'intro-step shepherd-theme-arrows',
                    attachTo: {
                        element: obj[mainID].steps[index].target,

                        on: obj[mainID].steps[index].position,


                    },

                    // getCurrentStepIndex: function() {
                    //     return GuidedTourUtils.findWithAttr(Shepherd.activeTour.steps, "id", Shepherd.activeTour.getCurrentStep().id);
                    // },
                    // findWithAttr: function(obj[mainID].steps, attr, value) {
                    //     for (var i = 0; i < obj[mainID].steps.length; i += 1) {
                    //         if (array[i][attr] === value) {
                    //             return i;
                    //         }
                    //     }
                    //     return -1;
                    // },

                    buttons: [{
                            action() {
                                return this.back();
                            },
                            classes: 'shepherd-button-secondary',
                            text: 'Back'
                        },
                        {
                            action() {
                                return this.next();
                            },
                            text: 'Next'
                        },
                        {
                            action() {
                                return this.complete();
                            },
                            text: 'Complete'
                        }
                    ],
                    id: obj[mainID].steps[index].id,
                    arrow: true,
                    showOn: obj[mainID].steps[index].position,
                    when: {

                        show() {
                            const currentStepElement = tour.currentStep.el;
                            const header = currentStepElement.querySelector('.shepherd-header');
                            const progress = document.createElement('span');
                            progress.style['margin-right'] = '1px';
                            progress.innerText = `${tour.steps.indexOf(tour.currentStep) + 1}/${tour.steps.length}`;
                            header.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));
                            var thisId = `${tour.steps.indexOf(tour.currentStep) + 1}`;
                            sessionStorage.setItem('stepID', thisId);
                        }

                    },


                });
                // }

            }
            // console.log(len);

            // if (index == obj[mainID].steps.length) {
            //     console.log(index);
            //     console.log(obj[mainID].steps.length);
            //     sessionStorage.clear();
            //     break;
            // }
        }

        // showOn() {
        //     return document.querySelector(obj[mainID].steps[index].position) ? true : false;
        // }

        // if (mainID) {
        //     for (index = 0; index < obj[mainID].steps.length; index++) {
        //         tour.on('show', function() {
        //             if (!myElement && previousStep.id === "the-previous-step") {
        //                 tour.next();
        //             } else if (!myElement && previousStep.id === "the-next-step") {
        //                 tour.back();
        //             }
        //         });
        //     }
        // }
        // for (i = 0; i < obj[mainID].steps.length; i++) {

        // }
        tour.start();
    });
}(Joomla, window));