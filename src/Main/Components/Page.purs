module Main.Components.Page (page) where

import Main.Components.Home (content)
import Main.Components.Layout (layout)
import React (ReactElement)

page :: ReactElement
page = layout content