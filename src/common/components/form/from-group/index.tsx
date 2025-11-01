import { Children, Fragment, ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface FormGroupProps extends ViewProps {
  children: ReactNode
}

export default function FormGroup ({ children, style, ...props }: FormGroupProps) {
  const styles = useThemedStyles(stylesModel)

  return (
    <View style={[styles.container, style]} {...props}>
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          <View style={index === Children.count(children) - 1 ? {} : styles.item}>
            {child}
          </View>
        </Fragment>
      ))}
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: palette.backgroundSecondary,
    borderWidth: 2,
    borderColor: palette.borderPrimary,
    overflow: 'hidden',
  },
  item: {
    borderBottomWidth: 2,
    borderColor: palette.borderPrimary,
  },
}))
