'useclent'
import TableCard from '@/app/features/tablesCard/tablecard'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'
import Tabs, { TabContent } from '@/components/molecules/Tabs/Tabs'

const TablePage = () => {
  return (
    <>
      <Tabs
        extraItems={[
          <div key={1} className="px-4 py-2 flex justify-center items-center gap-2">
            <ReuseIcon bgColor="#4BBF74" size={7} />
            <span>Available</span>
          </div>,
          <div key={2} className="px-4 py-2 flex justify-center items-center gap-2">
            <ReuseIcon bgColor="#FF8800" size={7} />
            <span>In progress</span>
          </div>,
        ]}
        title="Categories"
      >
        <TabContent label="Dine-In">
          <div className="grid lg:grid-cols-6 gap-2">
            <TableCard />
            <TableCard />
            <TableCard />
            <TableCard />
          </div>
        </TabContent>
        <TabContent label="Takeaway">
          <div className="grid lg:grid-cols-6 gap-2">
            <TableCard />
            <TableCard />
            <TableCard />
            <TableCard />
          </div>
        </TabContent>
        <TabContent label="Delivery Services">
          <div className="grid lg:grid-cols-6 gap-2">
            <TableCard />
            <TableCard />
            <TableCard />
            <TableCard />
          </div>
        </TabContent>
      </Tabs>
    </>
  )
}

export default TablePage
