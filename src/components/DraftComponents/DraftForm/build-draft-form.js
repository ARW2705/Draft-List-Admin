import { getBeverageList, getBeveragesByQuery } from '../../../services/Beverage/Beverage'
import { getDevices } from '../../../services/Device/Device'
import { getAllContainers } from '../../../services/Container/Container'

import createForm from '../../../shared/form/create-form'
import { required, pattern, eitherOr } from '../../../shared/validators/validators'


async function buildDeviceList() {
  const { devices } = await getDevices()
  return devices.map(device => ({ label: device.name || device.title, value: device._id }))
}

async function buildBeverageList(preselect) {
  let { beverages: beverageList } = await getBeverageList(0, 5)
  if (!preselect) return beverageList

  const dupIndex = beverageList.findIndex(beverage => beverage._id === preselect._id)
  if (dupIndex === -1) return beverageList
  
  return [preselect, ...beverageList.slice(0, dupIndex), ...beverageList.slice(dupIndex + 1)]
}

async function buildContainerList() {
  return (await getAllContainers()).map(container => ({ label: container.name, value: container }))
}

async function buildDraftForm({ containerPreselect, beveragePreselect, contentColorPreselect, isNewDraft }) {  
  let fields = {}

  if (isNewDraft) {
    fields = {
      device: {
        value: '',
        validators: [required()],
        element: 'select',
        options: {
          selectOptions: await buildDeviceList()
        }
      }
    }
  }

  fields = {
    ...fields,
    container: {
      value: containerPreselect,
      validators: [required()],
      element: 'select',
      options: {
        selectOptions: await buildContainerList()
      }
    },
    beverage: {
      value: '',
      element: 'query',
      options: {
        label: 'Search Beverages',
        queryFn: async queryTerm => {
          const { beverages } = await getBeveragesByQuery('name', queryTerm, 0, 1)
          return beverages[0]
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
        list: await buildBeverageList(beveragePreselect),
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


export { buildDraftForm }
