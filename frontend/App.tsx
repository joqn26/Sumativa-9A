import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { TaskBoard } from './components/tasks/TaskBoard';
import { TaskModal } from './components/modals/TaskModal';
import { mockTasks, mockUsers, mockProject } from './data/mockData';
import { Task } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const currentUser = mockUsers[0]; // Simulate logged in user

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard tasks={mockTasks} users={mockUsers} />;
      case 'tasks':
        return <TaskBoard tasks={mockTasks} onTaskClick={handleTaskClick} />;
      case 'sprints':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Sprints</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Vista de sprints en desarrollo...</p>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipo de Trabajo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.role}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tareas asignadas:</span>
                      <span className="font-medium">
                        {mockTasks.filter(t => t.assignee?.id === user.id).length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reportes y Métricas</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Dashboard de reportes en desarrollo...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Panel de configuración en desarrollo...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard tasks={mockTasks} users={mockUsers} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
      
      <TaskModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        users={mockUsers}
      />
    </div>
  );
}

export default App;