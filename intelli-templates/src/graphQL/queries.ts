export const getBrandingData = `query getBranding($clientName: String) {
  brandings(filters: { title: { eq: $clientName } }) {
    data {
      attributes {
        title
        spacingValue
        mixins
        fonts {
          regular {
            data {
              attributes {
                name
                url
              }
            }
          }
          bold {
            data {
              attributes {
                name
                url
              }
            }
          }
          semibold {
            data {
              attributes {
                name
                url
              }
            }
          }
          headline_bold {
            data {
              attributes {
                name
                url
              }
            }
          }
          headline_regular {
            data {
              attributes {
                name
                url
              }
            }
          }
          other {
            data {
              attributes {
                name
                url
              }
            }
          }
        }
        overrides
        palette {
          common {
            black
            white
          }
          primary {
            lighter
            light
            main
            dark
            darker
          }
          secondary {
            lighter
            light
            main
            dark
            darker
          }
          error {
            lighter
            light
            main
            dark
            darker
          }
          grey
          contrastThreshold
          tonalOffset
          text {
            primary
            secondary
            disabled
            hint
          }
          divider
          background {
            paper
            default
          }
          action {
            active
            hover
            hoverOpacity
            selected
            selectedOpacity
            disabled
            disabledBackground
            disabledOpacity
            focus
            focusOpacity
            activatedOpacity
          }
          success {
            lighter
            light
            main
            dark
            darker
          }
          warning {
            lighter
            light
            main
            dark
            darker
          }
          info {
            lighter
            light
            main
            dark
            darker
          }
        }
        shadows
        typography {
          fontFamily
          fontSize
          fontWeightLight
          fontWeightRegular
          fontWeightMedium
          body1 {
            fontSize
            fontFamily
            fontWeight
            lineHeight
            color
          }
          body2 {
            fontSize
            fontFamily
            fontWeight
            lineHeight
            color
          }
          caption {
            fontSize
            fontFamily
            fontWeight
            lineHeight
            color
          }
          button {
            fontFamily
            fontWeight
            fontSize
            textTransform
            color
            fontHeight
            letterSpacing
          }
          h1 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          h2 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          h3 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          h4 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          h5 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          h6 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          subtitle1 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          subtitle2 {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
          }
          overline {
            color
            fontFamily
            fontWeight
            fontSize
            lineHeight
            letterSpacing
            textTransform
          }
        }
        shape {
          borderRadius
        }
        zIndex {
          mobileStepper
          appBar
          drawer
          modal
          snackbar
          tooltip
        }
      }
    }
  }
  artifacts(filters: { title: { eq: $clientName } }) {
    data {
      attributes {
        logo {
          data {
            attributes {
              name
              url
            }
          }
        }
        loaderIcon {
          data {
            attributes {
              name
              url
            }
          }
        }
        onbordingHeaderImages{
          data{
            attributes{
              url
              name
            }
          }
        }
      }
    }
  }
  welcomeMailers(filters: {title : {eq: $clientName}}){
    data{
      attributes{
        welcome_mailer_data{
          emp_name
          emp_designation
          emp_image{
            data{
              attributes{
                name
                url
              }
            }
          }
          emp_hobby_img{
            data{
              attributes{
                name
                url
              }
            }
          }
          section_one
          section_two
          section_three
          section_four
          section_five
          social_link
        }
        validation{
          hr_approval
          marketing_approval
        }
      }
    }
  }
  
  commsErrors {
    data {
      id
      attributes {
        commsError {
          title
          snackBarError
          onlineErrorMessage
          offlineErrorMessage
          errorDetails
        }
      }
    }
  }
}`;
