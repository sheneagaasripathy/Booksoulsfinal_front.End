import React, { useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {

      display: 'block',
      // overflow: 'hidden',
      height : 200,
      width : 220,
    },
  }));

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  // const tutorialSteps = [
  //   {
  //     label: 'booksouls',
  //     imgPath:
  //       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  //   },
  //   {
  //     label: 'Bird',
  //     imgPath:
  //       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  //   },
  //   {
  //     label: 'Bali, Indonesia',
  //     imgPath:
  //       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  //   },
  //   {
  //     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
  //     imgPath:
  //       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  //   },
  //   {
  //     label: 'Goč, Serbia',
  //     imgPath:
  //       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  //   },
  // ];




  function BuyPhoto(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.image.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
      console.log(props.image)
    },[]);
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
  
    return (
      <>
              <div className={classes.root}>
          {/* <Paper square elevation={0} className={classes.header}>
            <Typography>{tutorialSteps[activeStep].label}</Typography>
          </Paper> */}
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {props.image.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img className={classes.img} src={step} alt="Book Image" />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
                
        </div>  
      </>
    )
  }

export default BuyPhoto 