-- module Main exposing (..)


module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import StartApp.Simple exposing (start)


-- MODEL


type Brightness
    = Light
    | Dark


type alias Model =
    Brightness



-- UPDATE


type Action
    = Toggle


update : Action -> Model -> Model
update action model =
    if Light == model then
        Dark
    else
        Light


brightnessButtText : Model -> String
brightnessButtText model =
    case model of
        Light ->
            "Wechsel zur Nachtsicht"

        Dark ->
            "Wechsel zur Tagesansicht"



-- VIEW


view : Signal.Address Action -> Model -> Html
view address model =
    div []
        [ div [ countStyle ] [ text (toString model) ]
        , button [ onClick address Toggle ] [ text (brightnessButtText model) ]
        ]


countStyle : Attribute
countStyle =
    style
        [ ( "font-size", "20px" )
        , ( "font-family", "monospace" )
        , ( "display", "inline-block" )
        , ( "width", "50px" )
        , ( "text-align", "center" )
        ]


main =
    start
        { model = Light
        , update = update
        , view = view
        }
