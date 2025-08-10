import React from 'react'
import { IconTablePlus, IconTableRow, IconTableSpark, IconTableAlias} from '@tabler/icons-react'

export const action = [
    {
        id:1,
        label : 'Watch Row',
        icon: <IconTableAlias />,
        description: 'Watch Row',
        type: 'watch_rows'
    },

    {
        id:2,
        label : 'Add a Row',
        icon: <IconTablePlus />,
        description: 'Add a row'
    },
    {
        id:3,
        label : 'Update Row',
        icon: <IconTableSpark />,
        description: 'Update row'
    }


]