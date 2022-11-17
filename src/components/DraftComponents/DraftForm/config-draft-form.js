import store from '../../../app/store'

import { selectBeverage, selectBeverageQuery } from '../../../services/beverage/store/beverage.slice'

import createForm   from '../../../shared/form/create-form'
import getPaginated from '../../../shared/utilities/get-paginated'
import { required, pattern, eitherOr } from '../../../shared/validators/validators'


function buildDeviceList() {
  const { devices } = store.getState()
  return devices.map(device => ({ label: device.name || device.title, value: device._id }))
}

function buildBeverageList(preselect) {
  const { beverages } = store.getState()
  const beverageList = getPaginated(beverages, 0, 5)
  if (!preselect) return beverageList

  const dupIndex = beverageList.findIndex(beverage => beverage._id === preselect._id)
  if (dupIndex === -1) return beverageList
  
  return [preselect, ...beverageList.slice(0, dupIndex), ...beverageList.slice(dupIndex + 1)]
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
        label: 'Search Beverages',
        queryFn: queryTerm => {
          const beverages = selectBeverageQuery(store.getState(), 'name', queryTerm)
          if (beverages.length) return beverages[0]
          return beverages
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
