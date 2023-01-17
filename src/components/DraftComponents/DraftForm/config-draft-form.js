import store from '../../../app/store'

import { selectBeverage, selectBeverageQuery } from '../../../services/beverage/store/beverage.selector'

import createForm from '../../../shared/form/create-form'
import { required, pattern, eitherOr } from '../../../shared/validators/validators'


function buildDeviceList() {
  const { devices } = store.getState()
  return devices.map(device => ({ label: device.name || device.title, value: device._id }))
}

function buildBeverageList(preselect) {
  const { beverages } = store.getState()
  const shortListSize = 5
  const beverageList = beverages.slice(0, shortListSize)
  if (!preselect) return beverageList

  const preselectIndex = beverages.findIndex(beverage => beverage._id === preselect._id)
  if (preselectIndex === -1) return beverageList

  if (preselectIndex < shortListSize) {
    return [preselect, ...beverageList.slice(0, preselectIndex), ...beverageList.slice(preselectIndex + 1)]
  }
  return [preselect, ...beverageList.slice(0, 4)]
}

function buildContainerList() {
  const { containers } = store.getState()
  return containers.map(container => ({ label: container.name, value: container }))
}

export function configDraftForm(draft) {
  let beveragePreselect = ''
  let contentColorPreselect = ''
  let containerPreselect = ''
  let fields = {}

  if (!draft) {
    fields = {
      device: {
        value: '',
        validators: [required()],
        element: 'select',
        options: {
          selectOptions: buildDeviceList()
        }
      }
    }
  } else {
    beveragePreselect = selectBeverage(store.getState(), draft.beverage)
    contentColorPreselect = draft.container.contentColor || ''
    containerPreselect = draft.container.containerInfo
  }

  fields = {
    ...fields,
    container: {
      value: containerPreselect,
      validators: [required()],
      element: 'select',
      options: {
        selectOptions: buildContainerList()
      }
    },
    beverage: {
      value: '',
      element: 'query',
      options: {
        label: 'Search By Beverage Name',
        queryFn: queryTerm => {
          const beverages = selectBeverageQuery(store.getState(), 'name', queryTerm)
          if (beverages.length) return beverages[0]
          return null
        },
        queryKeys: ['name', 'source', 'style'],
        queryValue: '_id'
      }
    },
    previousBeverage: {
      value: beveragePreselect,
      element: 'list',
      options: {
        label: 'Previously Used Beverages',
        list: buildBeverageList(beveragePreselect),
        displayKeys: ['name', 'source', 'style']
      }
    },
    contentColor: {
      value: contentColorPreselect,
      validators: [pattern(/^#([\da-fA-F]{3}){1,2}$/)]
    }
  }

  const onChanges = {
    previousBeverage: {
      beverage: {
        value: _value => _value
      }
    }
  }

  const validators = {
    eitherOr: eitherOr('beverage', 'previousBeverage')
  }

  return createForm({fields, onChanges, validators})
}
