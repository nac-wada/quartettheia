import { createRoot } from 'react-dom/client';
import './index.css';
import App from './AppRouterProvider';
import './i18n/config'; // 国際化,多言語化
import { DebugProvider } from './globalContexts/DebugContext'; // for virtual camera (delete)
import { DebugProviderDrawer } from './globalContexts/DebugDrawerContext'; // for drawer (delete)
import { ProviderAuth } from './globalContexts/AuthContext' // for login Authentication
import { ProviderDrawerOpen } from './globalContexts/DrawerContext'; // for left drawer
import { HelmetProvider } from 'react-helmet-async'; // for changing app title
import { RamPercentDisplayProvider } from './globalContexts/RamPercentContext';
import { DeviceProvider } from './globalContexts/DeviceContext';
import { MessagesProvider } from './globalContexts/MessagesContext';
import { SoloSubscribeEventProvider } from './globalContexts/SoloSubscribeEventContext';
import { NotificationProvider } from './globalContexts/NotificationContext';
import { AppThemeProvider } from './globalContexts/AppThemeContext';
import { QuartetSubscribeEventProvider } from './globalContexts/QuartetSubscribeEventContext';
import { QuartetSubscribeMessageProvider } from './globalContexts/QuartetSubscribeMessageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CalibrationModeProvider } from './globalContexts/CalibrationTypeContext';

export const queryClient = new QueryClient();

const container = document.getElementById('root');

if(!container) {
  throw new Error('failed to find the root element.')
}

const root = createRoot(container);

root.render(
	<HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ProviderAuth>
        <DebugProvider>
          <DebugProviderDrawer>
            <RamPercentDisplayProvider>
              <AppThemeProvider>
                <ProviderDrawerOpen>
                  <MessagesProvider>
                    <NotificationProvider>
                      <CalibrationModeProvider>
                        <QuartetSubscribeMessageProvider>
                          <QuartetSubscribeEventProvider>
                            <DeviceProvider>
                              <SoloSubscribeEventProvider>
                                <App />
                              </SoloSubscribeEventProvider>
                            </DeviceProvider>
                          </QuartetSubscribeEventProvider>
                        </QuartetSubscribeMessageProvider>
                      </CalibrationModeProvider>
                    </NotificationProvider>
                  </MessagesProvider>
                </ProviderDrawerOpen>
              </AppThemeProvider>
            </RamPercentDisplayProvider>
          </DebugProviderDrawer>
        </DebugProvider>
      </ProviderAuth>
    </QueryClientProvider>
  </HelmetProvider>
);