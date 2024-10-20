import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import Settings from "./TabComponents/Settings";
import Alerts from './TabComponents/Alerts';
import Defects from './TabComponents/Defects';
import Department from './TabComponents/Department';
import Machine from './TabComponents/Machine';




const items = [
  {
    key: '1',
    label: 'User Creation',
    children: <Settings />,

  },
  {
    key: '2',
    label: 'Defects',
    children: <Defects />,
  },
  {
    key: '3',
    label: 'Department',
    children: <Department />,
  },
  {
    key: '4',
    label: 'Machine',
    children: <Machine />,
  },
  {
    key: '5',
    label: 'Products',
    children: <Alerts />,
  },
];

const App = () =>
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          cardBg: "",
          inkBarColor: "#000",          // Ink bar color
          itemColor: "#000",            // Color for non-active tab text
          itemActiveColor: "#000",      // Text color for the active tab
          itemSelectedColor: "#fff",   // Text color when tab is selected
        },
      },
    }}
  >
    <Tabs
      type="card"
      size={'large'}
      defaultActiveKey="1"
      items={items}
    />
  </ConfigProvider>


export default App;