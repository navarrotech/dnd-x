// Copyright © 2024 Navarrotech

// Router
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router'

// Middleware & Outlets
import { AuthorizedOutlet } from '@/routes/Dashboard/Outlet'

// Misc
import { urls } from '@/constants'

// Routes
import { AuthRoutes } from '@/routes/Authentication'
import { ListCampaigns } from './routes/Campaigns/list'
import { CreateCampaign } from './routes/Campaigns/create'
import { ViewCampaign } from './routes/Campaigns/view'

// Router specific functionality can be added here:
export const Router = <BrowserRouter>
  <Routes>
    <Route index path={urls.root} element={<Navigate to={urls.login} />} />
    <Route path={urls.root} element={<AuthorizedOutlet />}>
      <Route path={urls.campaignList} element={<ListCampaigns />} />
      <Route path={urls.campaignCreate} element={<CreateCampaign />} />
      <Route path={urls.campaignView} element={<ViewCampaign />} />
    </Route>

    { AuthRoutes }

    {/* Redirect the user back to the default root if lost */}
    <Route path='*' element={<Navigate to={urls.default} />} />
  </Routes>
</BrowserRouter>
